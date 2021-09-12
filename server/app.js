const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()

const cors = require('cors')
const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://217.107.219.109:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log(origin, 'origin true')
      callback(null, true)
    } else {
      console.log(origin, 'origin false')
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://deluxenew:scaner12@deluxenewcluster.utabx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

    console.log('MONGO_DB_CONNECTED')
  }
  catch (e) {
    console.log(e)
  }
}

connect()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', cors(corsOptions), routes)

module.exports = app
