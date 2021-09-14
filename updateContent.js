/* eslint-disable camelcase */
/* eslint-disable no-console */
const fs = require('fs')
const dotenv = require('dotenv')
const { Octokit } = require('@octokit/rest')

dotenv.config()

const transformEntry = (
  lang,
  { type, name, path, size, download_url }
) => {
  const result = {
    lang,
    type,
    name,
    slug: path
  }

  if (type === 'file') {
    result.size = size
    result.downloadUrl = download_url
  }

  return result
}

const getIndexEntries = async (octokit) => {
  const { data: entriesDe } = await octokit.request('GET /repos/gambolputty/textstelle/contents/de')
  const { data: entriesEn } = await octokit.request('GET /repos/gambolputty/textstelle/contents/en')
  return entriesDe
    .map(entry => transformEntry('de', entry))
    .concat(
      entriesEn.map(entry => transformEntry('en', entry))
    )
}

const getAboutContent = async (octokit) => {
  // return HTML string
  const headers = { accept: 'application/vnd.github.VERSION.html' }
  const { data } = await octokit.request('GET /repos/gambolputty/textstelle/readme', { headers })
  return data
}

const getEntriesContent = async (octokit, entries) => {
  const owner = 'gambolputty'
  const repo = 'textstelle'
  let count = 0

  const delay = (t) => {
    return new Promise((resolve) => { setTimeout(resolve, t) })
  }

  const promises = entries.map(async (entry) => {
    const { lang, name } = entry
    const path = `${lang}/${name}`
    count += 1

    console.warn(`Getting entry ${count}: ${lang}/${name}`)

    const { data } = await octokit.repos.getContent({ owner, repo, path })
    const files = []
    let readme = null

    // seperate readme and other files
    if (Array.isArray(data)) {
      for (let i = 0, l = data.length; i < l; i++) {
        const file = data[i]

        if (file.name.toLowerCase() === 'readme.md') {
          readme = transformEntry(lang, file)
          continue
        }

        files.push(transformEntry(lang, file))
      }

      if (readme) {
        // get readme contents
        const headers = {
          accept: 'application/vnd.github.VERSION.html'
        }
        const { data: readmeData } = await octokit.repos.getContent({ owner, repo, path: `${readme.slug}`, headers })
        readme = readmeData
      }
    }

    await delay(1500)

    return {
      slug: path,
      type: 'dir',
      lang,
      name,
      readme,
      files
    }
  })

  return await Promise.all(promises)
}

const run = async () => {
  const octokit = new Octokit({ auth: process.env.GITHUB_SECRET })

  const indexEntries = await getIndexEntries(octokit)

  const aboutHTML = await getAboutContent(octokit)
  fs.writeFileSync('./content/about.json', JSON.stringify({
    title: 'About',
    content: aboutHTML
  }))

  const indexEntriesContent = await getEntriesContent(octokit, indexEntries)
  fs.writeFileSync('./content/entries.json', JSON.stringify(indexEntriesContent))
}

run()
