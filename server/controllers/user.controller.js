const { getDynamicModelFields } = require('../models/adminModules/dynamicCategory.model')

const excludedFields = ['tokens', 'password', '__v', '_id']
const { omit } = require('../common/helper')


module.exports.profile = async (req, res) => {
  const User = await getDynamicModelFields("users")
  if (!User) return
  const { params: { id: userId } } = req
  const candidate = await User.findOne({ '_id': userId })
  if (candidate) {
    const { '_doc': user } = candidate
    res.json({ id: user['_id'], ...omit(user, excludedFields) })
  }
}
