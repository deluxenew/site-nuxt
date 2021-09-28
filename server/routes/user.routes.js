const {Router} = require('express')
const auth = require('../auth/auth')
const router = Router()

const {
  profile,
} = require('../controllers/user.controller')

router.get('/my/:id', auth, profile)

module.exports = router
