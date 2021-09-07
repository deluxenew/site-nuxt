const { Router } = require('express')
const router = Router()
const { login, signup, all, logoutAll } = require('../controllers/auth.controller')

router.post('/user/login', login)
router.post('/user/logout-all', logoutAll)
router.post('/user/register', signup)
router.get('/user/all', all)

module.exports = router
