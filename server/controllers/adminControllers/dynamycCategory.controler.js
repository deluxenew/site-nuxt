const dynamicCategory = require('../../models/adminModules/dynamicCategory.model')
const consola = require('consola')
module.exports.all = async (req, res)  => {
  const baseUrl = req.baseUrl.split('/')
  const route = baseUrl[baseUrl.length - 1];
  consola.ready({route});
  const Model = dynamicCategory(route)
  const collections = await Model.find()

  if (collections) {
    console.log({collections});
    res.status(200).json(collections)
  }
}

module.exports.add = async (req, res) => {
  const baseUrl = req.baseUrl.split('/')
  const route = baseUrl[baseUrl.length - 1];
  const Model = dynamicCategory(route)
  const { body: { title, slug } } = req
  const candidate = await Model.findOne({slug})

  if (candidate) {
    res.status(409).json({message: 'Такая категория уже существует'})
  } else if (!title || !slug) {
    res.status(400).json({message: 'Заполните все обязадельные поля'})
  } else {
    const category = new Model({ title, slug })
    category.save()
    res.status(201).json(category)
  }
}
