const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
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
  parent: {
    type: String,
  },
  collectionName: {
    type: String,
    unique: true,
    required: true
  },
  fields: {
    type: Object,
  }
})

module.exports = model('Category', categorySchema)
