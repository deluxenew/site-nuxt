export default {
  head: {
    title: 'Строительство из дерева и камня',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Недорогое строительство под ключ с использованием современных материалов и технологий.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    { mode: 'all', src: '~/plugins/fontawesome' }
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
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'vue-yandex-maps/nuxt',
    ['nuxt-font-loader-strategy', {
      ignoreLighthouse: true,
      ignoredEffectiveTypes: ['2g', 'slow-2g'],
      prefetchCount: 0,
      fonts: [
        {
          fileExtensions: ['woff'],
          fontFamily: 'TTNorms',
          fontFaces: [
            {
              preload: true,
              src: '@/assets/fonts/WaffleSoft',
              fontWeight: 500,
              fontStyle: 'normal',
              fontDisplay: 'swap'
            },
            {
              preload: true,
              src: '@/assets/fonts/WaffleSlab',
              fontWeight: 400,
              fontStyle: 'normal',
              fontDisplay: 'swap'
            },
          ]
        },
      ]
    }]
  ],
  build: {
  },
  pwa: {
    manifest: {
      name: 'Строительство',
      short_name: 'BrusKing',
      description: 'Строительна платформа для заказчиков и клиентов',
      lang: 'ru',
      theme_color: '#4dce00',
      background_color: '#F2F4F5',
      useWebmanifestExtension: false,
      display: 'standalone',
    },
    meta: {
      mobileAppIOS: true,
      author: 'Саня',
      description: 'Приложение для строителей',
      lang: 'ru',
      ogSiteName: 'BrusKing'
    }
  },
}
