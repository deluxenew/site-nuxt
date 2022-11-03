const { Schema, model, models } = require('mongoose')
const consola = require('consola')
const { getPropValue } = require('../../../constants/adminItems')

const dynamicCategory = async function (route) {
  consola.ready({ route })
  const shortCategory = await models.Category.findOne({ slug: route })

  if (shortCategory) {
    consola.ready({ shortCategory })
    const { fields, collectionName } = shortCategory
    if (!collectionName) return null
    if (fields) {
      for (let field in fields) {
        for (let p in fields[field]) {
          fields[field][p] = getPropValue(p, fields[field][p])
        }
      }
      consola.ready({ fields })
      return models[collectionName] || model(collectionName, new Schema({ ...fields }))
    }
    return models[collectionName]
  }
}

module.exports.getDynamicModelFields = async (route) => models[route] || await dynamicCategory(route)

