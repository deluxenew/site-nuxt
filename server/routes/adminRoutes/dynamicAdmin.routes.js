const {Router} = require('express')

const router = Router()

const { all, add } = require('../../controllers/adminControllers/dynamycCategory.controler')

router.get('/all', all)
router.post('/add', add)

module.exports = router
