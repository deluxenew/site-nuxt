const express = require('express')
const authRoutes = require("./auth.routes");
const profileRoutes = require("./user.routes");
const router = express.Router()

router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)

module.exports = router
