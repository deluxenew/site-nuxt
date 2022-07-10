const { Schema, model, models } = require('mongoose')
const consola = require('consola')
const {  resInterceptors } = require('../../common/helper')
// const dynamicCategoryFields = require('../../fields/dynamicCategory.fields')
const dynamicCategoryName = require('../../names/categories.names')
const dynamicCategoryFields = {
  pages: {
    title: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
  },
//   users: {
//     name: {
//       type: String,
//     },
//     login: {
//       type: String,
//       unique: true,
//       required: true
//     },
//     password: {
//       type: String,
//       minLength: 6,
//       required: true
//     },
//     tokens: {
//       type: Array,
//       default: () => []
//     }
//   },
  categories: {
    title: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    collectionName: {
      type: String,
      unique: true,
      required: true
    },
    fields: {
      type: Object
    }
  },
//   services: {
//     title: {
//       type: String,
//       unique: true,
//       required: true
//     },
//     slug: {
//       type: String,
//       unique: true,
//       required: true
//     },
//   },
}
const dynamicCategory = async function(route) {

  const shortCategory = await models.Category.findOne({slug: route})
  if (shortCategory) {
    const {fields, collectionName} = shortCategory
    const categoryName = collectionName ? collectionName : dynamicCategoryName(route)
    consola.ready({shortCategory})
    const categorySchema = fields
      ? new Schema({...fields})
      : new Schema({...dynamicCategoryFields[route]})
    return models[categoryName] || model(categoryName, categorySchema)
  }
}

module.exports.categories = models.Category || dynamicCategory("categories")
module.exports.pages = models.Page || dynamicCategory("pages")
module.exports.users = models.User || dynamicCategory("users")
module.exports.services = models.Service || dynamicCategory("services")


module.exports.getDynamicModelFields = (route) => dynamicCategory(route)

