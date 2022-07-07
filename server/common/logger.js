const consola = require('consola')
const { response } = require('./textVariables')
require('dotenv').config()

const trowUnnamedError = () => {
  if (process.env.COMMON_LOGS_ENV) consola.ready("Неизвестная ошибка")
}

const setLog = (code, category) => {
  consola.ready(`${code}, ${response[category]["code_" + code]}`)
  if (process.env.COMMON_LOGS_ENV) consola.ready(`${code}, ${response[category]}`)
}

const logger = (code) => {
  if (!process.env.LOGS_ENV) return
  if (!code) return trowUnnamedError(code)
  const firstChar = code.toString()[0]
  switch (firstChar) {
    case "1":
      return setLog(code, "information")
    case "2":
      return setLog(code, "success")
    case "3":
      return setLog(code, "redirect")
    case "4":
      return setLog(code, "clientError")
    case "5":
      return setLog(code, "serverError")
  }
}
module.exports = logger
