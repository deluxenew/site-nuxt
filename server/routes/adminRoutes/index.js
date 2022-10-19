const express = require('express')
const router = express.Router()
const categoryRoutes = require("./category.routes");
const dynamicAdminRoutes = require("./dynamicAdmin.routes");

router.use('/category/:category', dynamicAdminRoutes)
router.use('/categories', categoryRoutes)

module.exports = router
