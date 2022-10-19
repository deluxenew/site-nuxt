const jwt = require("jsonwebtoken");
const { getDynamicModelFields } = require('../models/adminModules/dynamicCategory.model')


const auth = async (req, res, next) => {
  const User = await getDynamicModelFields("users")
  try {
    if (!User) return
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
