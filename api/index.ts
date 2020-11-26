import { Octokit } from '@octokit/rest'
import { ReposGetContentResponseData } from '@octokit/types'
import bodyParser from 'body-parser'
import express from 'express'

const app = express()
app.use(bodyParser.json())

let octokit: Octokit | null = null
const getOctokitInstance = () => {
  if (octokit !== null) {
    return octokit
  }

  octokit = new Octokit({ auth: process.env.GITHUB_SECRET })
  // const { data } = await octokit.request('GET /rate_limit')
  // console.warn('octokit', data)

  return octokit
}

const transformEntry = (lang: string, entry: ReposGetContentResponseData): IndexEntry => ({
  lang,
  type: entry.type,
  name: entry.name,
  path: entry.path,
  size: entry.size,
  downloadUrl: entry.download_url
})

app.get('/index', async (req, res) => {
  const api = getOctokitInstance()
  const { data: entriesDe } = await api.request('GET /repos/gambolputty/textstelle/contents/de')
  const { data: entriesEn } = await api.request('GET /repos/gambolputty/textstelle/contents/en')
  const entries: IndexEntry[] = entriesDe.map(
    (entry: ReposGetContentResponseData) => transformEntry('de', entry)
  )
    .concat(
      entriesEn.map((entry: ReposGetContentResponseData) => transformEntry('en', entry))
    )

  res.json({ entries })
})

app.get('/entry/:lang/:name', async (req, res) => {
  const { lang, name } = req.params
  const api = getOctokitInstance()
  const owner = 'gambolputty'
  const repo = 'textstelle'
  const { data: files } = await api.repos.getContent({ owner, repo, path: `${lang}/${name}` })
  let readme = null

  // seperate readme and other files
  if (Array.isArray(files)) {
    for (let i = 0, l = files.length; i < l; i++) {
      const file: ReposGetContentResponseData = files[i]

      if (file.name.toLowerCase() === 'readme.md') {
        readme = file
        files.splice(i, 1)
        break
      }
    }
  }

  // get readme contents
  if (readme) {
    const headers = {
      accept: 'application/vnd.github.VERSION.html'
    }
    const { data: readmeData } = await api.repos.getContent({ owner, repo, path: `${readme.path}`, headers })
    readme = readmeData
  }
  res.json({ dirName: name, readme, files })
})

module.exports = app
