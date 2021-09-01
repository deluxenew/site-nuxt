const mongoose = require('mongoose')
// Define collection and schema for todo item

const User = new mongoose.Schema({
    name: {
      type: String
    }
  },
  {
    collection: 'Users'
  }
)
module.exports = mongoose.model('Users', User)
