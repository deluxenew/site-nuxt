const express = require('express')
const router = express.Router()
const categoryRoutes = require("./category.routes");

router.use('/categories', categoryRoutes)

module.exports = router
