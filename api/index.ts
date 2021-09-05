/* eslint-disable camelcase */
import { Octokit } from '@octokit/rest'
import { components } from '@octokit/openapi-types'
import bodyParser from 'body-parser'
import express from 'express'

type RepoEndpoint = components['schemas']['content-file'];

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

const transformEntry = (
  lang: string,
  entry: RepoEndpoint
): IndexEntry => ({
  lang,
  type: entry.type,
  name: entry.name,
  path: entry.path,
  size: entry.size,
  downloadUrl: entry.download_url || ''
})

app.get('/index', async (req, res) => {
  const api = getOctokitInstance()
  const { data: entriesDe } = await api.request('GET /repos/gambolputty/textstelle/contents/de')
  const { data: entriesEn } = await api.request('GET /repos/gambolputty/textstelle/contents/en')
  const entries: IndexEntry[] = entriesDe.map(
    (entry: RepoEndpoint) => transformEntry('de', entry)
  )
    .concat(
      entriesEn.map((entry: RepoEndpoint) => transformEntry('en', entry))
    )

  res.json({ entries })
})

app.get('/about', async (req, res) => {
  const api = getOctokitInstance()
  const headers = { accept: 'application/vnd.github.VERSION.html' }
  const { data } = await api.request('GET /repos/gambolputty/textstelle/readme', { headers })
  res.json(data)
})

app.get('/entry/:lang/:name', async (req, res) => {
  const { lang, name } = req.params
  const api = getOctokitInstance()
  const owner = 'gambolputty'
  const repo = 'textstelle'
  const { data } = await api.repos.getContent({ owner, repo, path: `${lang}/${name}` })
  const files = []
  let readme = null

  // seperate readme and other files
  if (Array.isArray(data)) {
    for (let i = 0, l = data.length; i < l; i++) {
      const file = data[i] as RepoEndpoint

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
      const { data: readmeData } = await api.repos.getContent({ owner, repo, path: `${readme.path}`, headers })
      readme = readmeData
    }
  }

  res.json({ dirName: name, readme, files })
})

module.exports = app
