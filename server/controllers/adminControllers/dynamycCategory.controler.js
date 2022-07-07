const {  resInterceptors } = require('../../common/helper')
const dynamicCategory = require('../../models/adminModules/dynamicCategory.model')
const logger = require('../../common/logger')

const getModelByReqSlug = (req) => {
  const baseUrl = req.baseUrl.split('/')
  const route = baseUrl[baseUrl.length - 1];
  return dynamicCategory[route]
}

module.exports.all = async (req, res)  => {
  const Model = getModelByReqSlug(req)
  logger(res.statusCode)
  const collection = await Model.find()

  if (collection) {
    resInterceptors(res, collection)
  }
}

module.exports.add = async (req, res) => {
  const { body: { title, slug } } = req
  logger(res.statusCode)
  const Model = getModelByReqSlug(req)
  const candidate = await Model.findOne({slug})

  if (!candidate) {
    const category = new Model({ title, slug })
    category.save()
    resInterceptors(res, category)
  }
}

module.exports.edit = async (req, res) => {
  const { body: { title, slug } } = req
  logger(res.statusCode)
  const Model = getModelByReqSlug(req)
  const candidate = await Model.findOne({slug})

  if (!candidate) {
    const category = new Model({ title, slug })
    category.save()
    resInterceptors(res, category)
  }
}
