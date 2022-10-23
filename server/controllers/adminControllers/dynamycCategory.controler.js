const { resInterceptors } = require('../../common/helper')
const dynamicCategory = require('../../models/adminModules/dynamicCategory.model')

const getModelByReqSlug = async (req) => {
  const baseUrl = req.baseUrl.split('/')
  const route = baseUrl[baseUrl.length - 1];
  return dynamicCategory[route] || await dynamicCategory.getDynamicModelFields(route)
}

module.exports.all = async (req, res) => {
  const Model = await getModelByReqSlug(req)
  const collection = await Model.find()

  if (collection) {
    resInterceptors(res, collection)
  }
}

module.exports.add = async (req, res) => {
  const {body} = req
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
  const Model = await getModelByReqSlug(req)
  const candidate = await Model.findOneAndReplace({slug: body.slug}, body, {new: true})

  if (candidate) {
    resInterceptors(res, candidate)
  }
}

module.exports.remove = async (req, res) => {
  const {params: { id: _id } } = req
  const Model = await getModelByReqSlug(req)
  const complete = await Model.deleteOne({_id: _id})

  if (complete) {
    resInterceptors(res, complete)
  }
}
