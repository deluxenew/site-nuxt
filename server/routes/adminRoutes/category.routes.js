const {Router} = require('express')

const router = Router()

const { all, add, edit } = require('../../controllers/adminControllers/categories.controller')

router.get('/all', all)
router.post('/add', add)
router.put('/edit', edit)

module.exports = router
