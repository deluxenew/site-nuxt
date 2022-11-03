const { resInterceptors } = require('../../common/helper')
const CategoryModel = require('../../models/adminModules/categories.model')

module.exports.all = async (req, res) => {
  const collections = await CategoryModel.find()

  if (collections) {
    resInterceptors(res, collections)
  }
}

module.exports.add = async (req, res) => {
  const { body } = req
  const candidate = await CategoryModel.findOne({ slug: body.slug })

  if (candidate) {
    res.status(409).json({ message: 'Такая категория уже существует' })
  } else if (!body.title || !body.slug) {
    res.status(400).json({ message: 'Заполните все обязадельные поля' })
  } else {
    const category = new CategoryModel(body)
    category.save()
    resInterceptors(res, category)
  }
}

module.exports.edit = async (req, res) => {
  const { body } = req
  const candidate = await CategoryModel.findOneAndReplace({ slug: body.slug }, body, { new: true })

  if (candidate) {
    resInterceptors(res, candidate)
  }
}

module.exports.remove = async (req, res) => {
  const { params: { id: _id } } = req
  const complete = await CategoryModel.deleteOne({ _id: _id })

  if (complete) {
    resInterceptors(res, complete)
  }
}

