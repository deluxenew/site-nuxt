const {resInterceptors} = require('../../common/helper')
const dynamicCategory = require('../../models/adminModules/dynamicCategory.model')
const logger = require('../../common/logger')

const getModelByReqSlug = async (req) => {
  const baseUrl = req.baseUrl.split('/')
  const route = baseUrl[baseUrl.length - 1];
  return dynamicCategory[route] || await dynamicCategory.getDynamicModelFields(route)
}

module.exports.all = async (req, res) => {
  const Model = await getModelByReqSlug(req)
  logger(res.statusCode)
  const collection = await Model.find()

  if (collection) {
    resInterceptors(res, collection)
  }
}

module.exports.add = async (req, res) => {
  const {body} = req
  logger(res.statusCode)
  const Model = await getModelByReqSlug(req)
  const candidate = await Model.findOne({slug: body.slug})

  if (!candidate) {
    const category = new Model(body)
    category.save()
    resInterceptors(res, category)
  }
}

module.exports.edit = async (req, res) => {
  const {body} = req
  logger(res.statusCode)
  const Model = await getModelByReqSlug(req)
  const candidate = await Model.findOne({slug: body.slug})
  if (candidate) {
    const obj = {...candidate}
    for (let i in body) {
      obj[i] = body[i]
    }
    await Model.update({slug: body.slug, obj})
  }
}
