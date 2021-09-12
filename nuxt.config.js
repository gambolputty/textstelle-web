const metaTitle = process.env.PROJECT_TITLE
const metaDescr = process.env.PROJECT_DESCRIPTION

export default {
  telemetry: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  generate: {
    // crawler: true
    interval: 500
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    siteTitle: process.env.PROJECT_TITLE,
    siteDescription: process.env.PROJECT_DESCRIPTION
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: metaTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: metaDescr }
      // { hid: 'og:site_name', property: 'og:site_name', content: metaTitle },
      // { hid: 'og:title', property: 'og:title', content: metaTitle },
      // { hid: 'og:description', property: 'og:description', content: metaDescr },
      // { hid: 'og:type', property: 'og:type', content: 'website' },
      // { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL }
    ],
    link: [
      { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' },
      { rel: 'favicon', type: 'image/png', href: '/img/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/normalize.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/utils.ts'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    ['@nuxtjs/fontawesome', {
      icons: {
        solid: ['faCaretLeft', 'faSpinner'],
        regular: ['faFolder', 'faFolderOpen', 'faFile'],
        brands: ['faGithub']
      }
    }]
  ],

  styleResources: {
    scss: [
      '@/node_modules/sass-rem/_rem.scss',
      '@/assets/css/variables.scss'
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  // axios: {},

  // router: {
  //   extendRoutes (routes, resolve) {
  //     routes.push({
  //       name: 'entry',
  //       path: '/:lang/:slug',
  //       component: resolve(__dirname, 'pages/_entry.vue')
  //     })
  //   }
  // },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: false,
    extend (config, { isDev }) {
      // sourcemap
      if (isDev) {
        config.devtool = 'inline-source-map'
        // config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
