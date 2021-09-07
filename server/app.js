const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/admin')

    console.log('MONGO_DB_CONNECTED')
  }
  catch (e) {
    console.log(e)
  }
}

connect()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', routes)

module.exports = app
