const { Schema, model, models } = require('mongoose')

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
  users: {
    name: {
      type: String,
    },
    login: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minLength: 6,
      required: true
    },
    tokens: {
      type: Array,
      default: () => []
    }
  },
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
  },
  services: {
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
}
const dynamicCategory = function(route) {
  const categoryName = dynamicCategoryName(route)
  const categorySchema = new Schema({
    ...dynamicCategoryFields[route]
  })
  return model(categoryName, categorySchema)
}

module.exports.categories = models.Category || dynamicCategory("categories")
module.exports.pages = models.Page || dynamicCategory("pages")
module.exports.users = models.User || dynamicCategory("users")
module.exports.services = models.Service || dynamicCategory("services")
