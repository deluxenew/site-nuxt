const fields = require("./list.filds")

module.exports = function(route) {
  const { title, slug, name, login, password, tokens } = fields
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
    }
  }
  return dynamicCategoryFields[route]
}
