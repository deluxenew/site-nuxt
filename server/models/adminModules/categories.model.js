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
    unique: false,
    required: false,
  },
  isStaticValues: {
    type: Boolean,
    required: true,
    default: false
  },
  collectionName: {
    type: String,
    unique: true,
    required: true
  },
  minAccessLevel: {
    type: Number,
    required: true,
    unique: false,
    default: 0
  },
  fields: {
    type: Object,
    required: false
  }
})

module.exports = model('Category', categorySchema)
