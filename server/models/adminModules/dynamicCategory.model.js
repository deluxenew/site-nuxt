const { Schema, model, models } = require('mongoose')
const consola = require('consola')
const { getPropValue, getPropName } =  require('../../../constants/adminItems')

const dynamicCategory = async function(route) {
  const shortCategory = await models.Category.findOne({slug: route})

  if (shortCategory) {
    consola.ready({shortCategory})
    const {fields, collectionName} = shortCategory
    // consola.ready({fields})
    if (!collectionName) return null
    if (fields) {
      for (let field in fields) {
        for (let p in fields[field]) {
          fields[field][p] = getPropValue(p, fields[field][p])
        }
      }
      consola.ready({fields})
      return models[collectionName] || model(collectionName, new Schema({...fields}))
    }
    return models[collectionName]
  }
}

module.exports.categories = models.Category || dynamicCategory("categories")
module.exports.pages = models.Page || dynamicCategory("pages")
module.exports.users = models.User || dynamicCategory("users")
module.exports.services = models.Service || dynamicCategory("services")


module.exports.getDynamicModelFields = (route) => dynamicCategory(route)

