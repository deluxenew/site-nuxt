const debug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const { resolve } = require('path')

module.exports = {
  isDev: debug,
  telemetry: false,
  ssr: true,
  server: {
    port: 3000, // default: 3000
    host: 'localhost',
  },
  head: {
    title: 'Строительство из дерева и камня',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Недорогое строительство под ключ с использованием современных материалов и технологий.'
      },
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
    { mode: 'client', src: '~/plugins/vue-js-modal' },
    { mode: 'client', src: '~/plugins/vue-notifications' },
    { mode: 'client', src: '~/plugins/persistedstate' },
    { mode: 'client', src: '~/plugins/constants' },
  ],
  styleResources: {
    scss: [
      '@/assets/vars/variables.scss',
    ]
  },
  redirect: [ {
    from: '^(?!.*\\?).*(?<!\\/)$',
    to: (from, req) => {
      return req.url + '/';
    }
  }],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth-next',
    'vue-yandex-maps/nuxt',
    '@nuxtjs/redirect-module',
    ['nuxt-font-loader-strategy', {
      ignoreLighthouse: true,
      ignoredEffectiveTypes: ['2g', 'slow-2g'],
      prefetchCount: 0,
      fonts: [
        {
          fileExtensions: ['woff2'],
          fontFamily: 'ui-sans-serif',
          fontFaces: [
            {
              preload: true,
              src: '@/assets/fonts/SansRegular',
              fontWeight: 400,
              fontStyle: 'normal',
              fontDisplay: 'swap'
            },
            {
              preload: true,
              src: '@/assets/fonts/SansBold',
              fontWeight: 700,
              fontStyle: 'normal',
              fontDisplay: 'swap'
            },
            {
              preload: true,
              src: '@/assets/fonts/SansItalic',
              fontWeight: 400,
              fontStyle: 'italic',
              fontDisplay: 'swap'
            },
            {
              preload: true,
              src: '@/assets/fonts/SansBoldItalic',
              fontWeight: 700,
              fontStyle: 'italic',
              fontDisplay: 'swap'
            },
          ]
        },
      ]
    }],
    ['nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
  ],
  router:  {

  },
  serverMiddleware: ['~/serverMiddleware/selectiveSSR'],
  axios: {
    baseURL: `https://${process.env.SERVER_URL}:${process.env.PORT}`,
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
          login: { url: '/api/auth/user/login', method: 'post', propertyName: 'jwt-token' },
          refresh: { url: '/api/auth/refresh', method: 'post', propertyName: 'refresh_token' },
          logout: { url: '/api/auth/user/logout', method: 'post' },
          user: { url: '/api/auth/user/me', method: 'get', propertyName: '' }
        },

        tokenRequired: true,
        tokenType: 'JWT'
      }
    },
  },
  buildModules: [
    '@nuxt/postcss8',
    'nuxt-compress'
  ],
  build: {
    extend(config) {
      config.resolve.alias['COMPONENTS'] = '@@/components'
      config.resolve.alias['CONSTANTS'] = '@@/constants'
      config.module.rules.push({
        test: /\.vue$/,
        loader: require.resolve("vue-template-pug-remove-indent-loader"),
      })
    },
    babel: {
      presets({ envName }) {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    optimizeCSS: !debug,
    optimization: {
      minimize: !debug,
      splitChunks: {
        maxSize: 249856 * 2,
      },
    },
    splitChunks: {
      name: debug,
      layouts: true,
      pages: true,
      commons: true,
    },
    // extractCSS: {
    //   ignoreOrder: true,
    // },
    ...(!debug && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      },
    }),
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
        .filter(f => f.asType === 'script' && f.file === 'runtime.js')
        .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}; crossorigin=anonymous`),
    },
    crossorigin: 'anonymous',
    // compressor: shrinkRay()
  },
}
