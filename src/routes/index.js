const express = require('express')
const router = express.Router()

router.use('/routename', require('./routeNameRoutes'))
router.use('/user', require('./routeNameRoutes'))

module.exports = router
