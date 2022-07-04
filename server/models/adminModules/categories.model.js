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
  }
})

module.exports = model('Category', categorySchema)
