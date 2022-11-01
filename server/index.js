const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = require('./app')

const config = require('../configs/nuxt.config.js')

async function start () {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  await nuxt.ready()
  if (config.isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)
  app.listen(port, host, ()=>{
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}
start()
