export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/vue-apexchart.js', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    ['nuxt-buefy', { css: true, materialDesignIcons: true, iconfont: 'mdi' }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy'
  ],
  buefy: {
    defaultIconPack: 'fas',
    defaultIconComponent: 'FontAwesomeIcon',
    materialDesignIcons: false
  },
  fontawesome: {
    icons: {
      // solid: true,  // include the full pack in the bundle, not recommended
      solid: [
        'faHome',
        'faUserCog',
        'faProjectDiagram',
        'faNewspaper',
        'faChartPie',
        'faCaretDown',
        'faSlidersH',
        'faAngleRight',
        'faLink'
      ] // include only icons required by your project
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.URL || process.env.baseURL
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['vue-apexchart'],
    extend(config, ctx) {}
  }
}
