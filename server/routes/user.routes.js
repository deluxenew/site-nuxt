const { Router } = require('express')
const auth = require('../auth/auth')
const { profile } = require('../controllers/user.controller')
const router = Router()

router.get('/my/:id', auth, profile)

module.exports = router
