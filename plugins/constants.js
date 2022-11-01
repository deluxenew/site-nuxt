export default (ctx, inject) => {
  const constants = {
    baseUrl: ctx.isDev ? "localhost:3000" : "https://struger.online",
    siteName: "Der Struger",
    isDev: ctx.isDev
  }

  Object.keys(constants).forEach((el) => {
    inject(el, constants[el])
  })
}
