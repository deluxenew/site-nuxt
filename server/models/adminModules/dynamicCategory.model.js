const { Schema, model, models } = require('mongoose')
const consola = require('consola')
const { getPropType } =  require('../../../constants/adminItems')

const dynamicCategory = async function(route) {
  const shortCategory = await models.Category.findOne({slug: route})
  if (shortCategory) {
    const {fields, collectionName} = shortCategory
    // consola.ready({fields})
    if (!collectionName) return null
    if (fields) {
      for (let i in fields) {
        for (let p in fields[i]) {
          fields[i][p] = getPropType(fields[i][p])
        }
      }
      consola.ready({fields})
      return models[collectionName] || model(collectionName, new Schema({...fields}))
    }
    return models[collectionName]
  }
}

module.exports.categories = models.Category || dynamicCategory("categories")

module.exports.getDynamicModelFields = (route) => dynamicCategory(route)

