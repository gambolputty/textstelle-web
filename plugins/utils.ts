import { Plugin, Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

declare module 'vue/types/vue' {
  interface Vue {
    $sortAlphabetically(arr: { [key: string ]: any }[], key: string): { [key: string ]: any },
    $formatBytes(bytes: number, decimals?: number): string,
  }
}

function sortAlphabetically (arr: { [key: string ]: any }[], key: string): { [key: string ]: any } {
  // Sort alphabetically
  // https://stackoverflow.com/a/29865697/5732518
  const gerColl = new Intl.Collator('de-DE-u-co-phonebk')
  let result = []

  result = arr.sort(function (a, b) {
    return gerColl.compare(a[key], b[key])
  })

  // for (let x = 0, l = arr.length; x < l; x++) {
  //   result = arr.sort(function (a, b) {
  //     return gerColl.compare(a[key], b[key])
  //   })
  // }
  return result
}

function formatBytes (bytes: number, decimals?: number) {
  if (bytes === 0) {
    return '0 Bytes'
  }
  const k = 1024
  const dm = decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const plugin: Plugin = (context: Context, inject: Inject) => {
  inject('sortAlphabetically', sortAlphabetically)
  inject('formatBytes', formatBytes)
}

export default plugin
