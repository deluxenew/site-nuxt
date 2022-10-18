const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
// const { getDynamicModelFields } = require('../models/adminModules/dynamicCategory.model')
// const User = getDynamicModelFields("users")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const { userId } = jwt.verify(token,  process.env.TOKEN_KEY);
    const user = await User.findOne({ '_id': userId });
    const userAgent = req.headers['user-agent']

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    req.userAgent = userAgent
    next();
  } catch (e) {
    res.status(401).send("Not autheticated");
  }
};

module.exports = auth;
