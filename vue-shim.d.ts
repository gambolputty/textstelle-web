declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface IndexEntry {
  lang: string,
  type: string,
  name: string,
  path: string,
  size: number,
  downloadUrl: string
}

interface IndexFilter {
  lang: string | null
}
