const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
require('dotenv').config();
const debug = process.env.NODE_ENV === 'development'

const cors = require('cors')
const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000', `https://${process.env.SERVER_URL}`]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // console.log(origin, 'origin true')
      callback(null, true)
    } else {
      // console.log(origin, 'origin false')
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const serverUrl = process.env.SERVER_URL
const port = process.env.PORT
const dbName = process.env.DB_NAME


const mongoConnectStringDev = `mongodb://${dbUser}:${dbPassword}@${serverUrl}/${dbName}`
const mongoConnectStringProd = `mongodb://127.0.0.1/${dbName}`
const mongoConnectString = debug ? mongoConnectStringDev : mongoConnectStringProd

async function connect() {
  try {
    await mongoose.connect(mongoConnectString)

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
