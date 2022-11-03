const { Router } = require('express')

const router = Router()
const auth = require('../auth/auth')
const {
  login, register, logoutAll, me, logout
} = require('../controllers/auth.controller')

router.post('/user/login', login)
router.post('/user/logout-all', auth, logoutAll)
router.post('/user/logout', auth, logout)
router.post('/user/register', register)
router.get('/user/me', auth, me)

module.exports = router
