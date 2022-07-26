const {Router} = require('express')

const router = Router()

const { all, add, edit, remove } = require('../../controllers/adminControllers/dynamycCategory.controler')

router.get('/all', all)
router.post('/add', add)
router.put('/edit', edit)
router.delete('/remove/:id', remove)

module.exports = router
