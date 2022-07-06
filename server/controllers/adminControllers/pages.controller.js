const PageModel = require('../../models/adminModules/pages.model')

module.exports.all = async (req, res) => {
  const pages = await PageModel.find()

  if (pages) {
    res.status(200).json(pages)
  }
}

module.exports.add = async (req, res) => {
  const { body: { title, slug } } = req
  const candidate = await PageModel.findOne({slug})

  if (candidate) {
    res.status(409).json({message: 'Такая страница уже существует'})
  } else if (!title || !slug) {
    res.status(400).json({message: 'Заполните все обязадельные поля'})
  } else {
    const page = new PageModel({ title, slug })
    page.save()
    res.status(201).json(page)
  }
}
