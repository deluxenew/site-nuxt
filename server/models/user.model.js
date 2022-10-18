const { Schema, model } = require('mongoose')

const userSchema = new Schema({
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
  },
  accessLevel: {
    type: Number,
    default: 0,
  },
})

module.exports = model('User', userSchema)
