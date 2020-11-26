import { Plugin, Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { Octokit } from '@octokit/rest'
// import { createTokenAuth } from '@octokit/auth-token'

declare module '@nuxt/types' {
  interface Context {
    $octokit: Octokit
  }
}

// let octokit: Octokit | null = null
// const getInstance = async (apiSecret: string) => {
//   if (octokit !== null) {
//     return octokit
//   }

//   // const auth = createTokenAuth($config.apiSecret)
//   // const authentication = await auth()
//   console.warn('secret', apiSecret)
//   octokit = new Octokit({
//     auth: apiSecret,
//     request: {
//       // headers: {
//       //   accept: 'application/vnd.github.VERSION.html'
//       // }
//     }
//   })
//   const { data } = await octokit.request('GET /rate_limit')
//   console.count('auth')
//   console.warn('octokit', data)

//   return octokit
// }

// const plugin: Plugin = async ({ $config }: Context, inject: Inject) => {
//   // console.count('octokit')
//   // console.warn('auth', octokit)

//   // inject('octokit', await getInstance($config.apiSecret))
// }

// export default plugin
