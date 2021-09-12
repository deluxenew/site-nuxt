const debug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export default {
  ssr: true,
  telemetry: false,
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost,
    timing: false
  },
  head: {
    title: 'Строительство из дерева и камня',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Недорогое строительство под ключ с использованием современных материалов и технологий.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@/assets/sass/main.scss',
  ],
  plugins: [
    { mode: 'all', src: '~/plugins/fontawesome' },
    { mode: 'all', src: '~/plugins/api-plugin' },
    { mode: 'all', src: '~/plugins/utils-plugin' },
    { mode: 'client', src: '~/plugins/vue-js-modal'},
    { mode: 'client', src: '~/plugins/vue-notifications' },
  ],
  styleResources: {
    scss: [
      '@/assets/vars/variables.scss',
    ]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth-next',
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
  router: {
    // middleware: ['auth']
  },
  axios: {
    baseURL: process.env.HOST_URL,
    withCredentials: true,
    debug,
  },
  auth: {
    redirect: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
          maxAge: 7 * 24 * 60 * 60,
        },
        user: {
          property: false,
          autoFetch: false
        },
        refreshToken: {
          property: 'refreshToken',
          // required: true,
          maxAge: 30 * 24 * 60 * 60,
          data: 'refreshToken',
          type: 'Bearer',
        },
        endpoints: {
          login: {url: '/api/auth/user/login', method: 'post', propertyName: 'jwt-token'},
          refresh: {url: '/api/auth/refresh', method: 'post', propertyName: 'refresh_token'},
          logout: {url: '/api/auth/user/logout', method: 'post'},
          user: {url: '/api/auth/user/me', method: 'get', propertyName: ''}
        },

        tokenRequired: true,
        tokenType: 'JWT'
      }
    },
  },
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
  render: {
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
        .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
    compressor: false,
  },
}
