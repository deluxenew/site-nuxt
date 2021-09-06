const { Router } = require('express')
const router = Router()
const { login, signup, all } = require('../controllers/auth.controller')

router.post('/user/login', login)

router.post('/user/register', signup)

router.get('/user/all', all)

module.exports = router
