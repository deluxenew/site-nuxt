export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
  ],
  components: true,
  buildModules: [
  ],
  css: [
    '@/assets/sass/main.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/vars/variables.scss',
    ]
  },
  modules: [
    '@nuxtjs/style-resources',
    ['nuxt-font-loader-strategy', {
      ignoreLighthouse: true,
      ignoredEffectiveTypes: ['2g', 'slow-2g'],
      prefetchCount: 0,
      fonts: [
        {
          fileExtensions: ['woff', 'ttf', 'eot'],
          fontFamily: 'TTNorms',
          fontFaces: [
            {
              preload: true,
              src: '@/assets/fonts/TTNorms-Bold',
              fontWeight: 700,
              fontStyle: 'normal',
              fontDisplay: 'auto'
            },
            {
              preload: true,
              src: '@/assets/fonts/TTNorms-Regular',
              fontWeight: 400,
              fontStyle: 'normal',
              fontDisplay: 'auto'
            },
            {
              preload: false,
              src: '@/assets/fonts/TTNorms-Medium',
              fontWeight: 500,
              fontStyle: 'normal',
              fontDisplay: 'auto'
            },
            {
              preload: false,
              src: '@/assets/fonts/TTNorms-Light',
              fontWeight: 300,
              fontStyle: 'normal',
              fontDisplay: 'auto'
            }
          ]
        },
      ]
    }]
  ],
  build: {
  }
}
