import { Plugin, Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { Octokit } from '@octokit/rest'

declare module '@nuxt/types' {
  interface Context {
    $octokit: Octokit
  }
}

const plugin: Plugin = async ({ $config }: Context, inject: Inject) => {
  const octokit = new Octokit({
    auth: $config.apiSecret,
    request: {
      headers: {
        accept: 'application/vnd.github.VERSION.html'
      }
    }
  })
  // const { data } = await octokit.request('GET /rate_limit')
  // console.warn('octokit', data)
  // console.count('octokit')
  // console.warn('auth', octokit)

  inject('octokit', octokit)
}

export default plugin
