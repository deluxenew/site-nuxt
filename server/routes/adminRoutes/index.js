const express = require('express')
const router = express.Router()
const categoryRoutes = require("./category.routes");
// const pageRoutes = require("./page.routes");
const dynamicAdminRoutes = require("./dynamicAdmin.routes");

// router.use('/:category', (req, res) => {
//   const route = req.params.category;
//   dynamicAdminRoutes(route)
// } )
router.use('/category/:category', dynamicAdminRoutes)
router.use('/categories', categoryRoutes)
// router.use('/pages', pageRoutes)

module.exports = router
