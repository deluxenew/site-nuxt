const {Router} = require('express')

const router = Router()

const {
  profile,
} = require('../controllers/user.controller')

router.get('/my/:id', profile)

module.exports = router
