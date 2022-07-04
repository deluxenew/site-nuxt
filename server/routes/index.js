const express = require('express')
const authRoutes = require("./auth.routes");
const profileRoutes = require("./user.routes");
const adminRoutes = require("./adminRoutes");
const router = express.Router()

router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)
router.use('/admin', adminRoutes)

module.exports = router
