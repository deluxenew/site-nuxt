const {Router} = require('express')

const router = Router()

const { all, add } = require('../../controllers/adminControllers/categories.controller')

router.get('/all', all)
router.post('/add', add)

module.exports = router
