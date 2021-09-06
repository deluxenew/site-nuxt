const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 6,
    required: true
  }

})

module.exports = model('User', userSchema)
