const CategoryModel = require('../../models/adminModules/categories.model')

module.exports.all = async (req, res) => {
  const collections = await CategoryModel.find()

  if (collections) {
    console.log({collections});
    res.status(200).json(collections)
  }
}

module.exports.add = async (req, res) => {
  const { body: { title, slug, categoryModelFields } } = req
  const candidate = await CategoryModel.findOne({slug})

  if (candidate) {
    res.status(409).json({message: 'Такая категория уже существует'})
  } else if (!title || !slug) {
    res.status(400).json({message: 'Заполните все обязадельные поля'})
  } else {
    const category = new CategoryModel({ title, slug, categoryModelFields })
    category.save()
    res.status(201).json(category)
  }
}
