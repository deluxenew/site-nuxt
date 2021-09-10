const {Router} = require('express')
const router = Router()
const auth = require('../auth/auth')
const {
  login, signup, all, logoutAll, me, logout
} = require('../controllers/auth.controller')

router.post('/user/login', login)
router.post('/user/logout-all', auth, logoutAll)
router.post('/user/logout', auth, logout)
router.post('/user/register', signup)
router.get('/user/me', me)

module.exports = router
