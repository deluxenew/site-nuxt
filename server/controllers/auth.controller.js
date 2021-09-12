const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const {omit, isTokenValid} = require('../common/helper')

const excludedFields = ['tokens', 'password', '__v', '_id']

module.exports.me = async (req, res) => {
  const rawToken = req.header("Authorization")
  const token = rawToken.replace("Bearer ", "");
  const {userId} = jwt.verify(token, "str123scan");
  const candidate = await User.findOne({'_id': userId})

  if (candidate) {
    const {'_doc': user} = candidate
    if (isTokenValid(rawToken)) {
      res.json({id: user['_id'], ...omit(user, excludedFields)})
    } else {
      res.status(402).json({message: 'Истёк срок действия токена. Необходимо заново авторизоавться'})
    }
  } else {
    res.status(404).json({message: 'Авторизационные данные в Вашем браузере более не актуальны. Пожалуйтса, авторизуйтесь'})
  }
}

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if (candidate) {
    const isPassCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    const {'_doc': {tokens}, '_doc': oldUser} = candidate
    if (isPassCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, 'str123scan', {expiresIn: 60 * 60})

      const headerUserAgent = req.headers["user-agent"]

      const refreshToken = jwt.sign({
        login: candidate.login,
        userId: candidate._id,
        userAgent: headerUserAgent
      }, 'str123scan', {expiresIn: 60 * 60})

      const findUserAgent = tokens.find(({userAgent}) => userAgent === headerUserAgent)
      if (!findUserAgent) {
        await User.findOneAndUpdate(
          {login: req.body.login},
          {$push: {tokens: {token, refreshToken, userAgent: headerUserAgent}}}
        )

        res.json({
          token,
          refreshToken
        })
      } else {
        res.json({
          token,
          refreshToken,
          status: 'Сессия с этого устройства уже активна, непонятно зачем, а главное как ты так смог сделать... :)',
        })
      }
    } else {
      res.status(403).json({message: 'Проверьте имя пользователя или пароль'})
    }
  } else {
    res.status(404).json({message: 'Проверьте имя пользователя или пароль'})
  }
}

module.exports.logoutAll = async (req, res) => {
  console.log(req)
  const {user: {login}} = req

  const findUser = await User.findOne({login})

  if (findUser) {
    await User.findOneAndUpdate({login}, {tokens: []})

    const updatedUser = await User.findOne({login: req.body.login})
    if (updatedUser) {
      const {'_doc': {tokens}} = updatedUser

      if (tokens && tokens.length === 0) res.json({message: 'Поздравляем, вы успешно разлогинились во всех устройствах'})
      else res.status(500).json({message: 'При попытке разлогиниться на всех устройствах произошла ошибка'})
    }
  }
}

module.exports.logout = async (req, res) => {
  const {user: {login}, userAgent} = req
  const findUser = await User.findOne({login})

  if (findUser) {
    let {'_doc': {tokens}} = findUser
    const idx = tokens.findIndex(el => userAgent === el.userAgent)
    if (idx > -1) {
      tokens.splice(idx, 1)
      await User.findOneAndUpdate({login}, {tokens})
    }
    const updatedUser = await User.findOne({login})

    if (updatedUser) {
      res.json({message: 'Вы успешно разлогинились, возвращайтесь к нам снова! :-)'})
    }
  }
}

module.exports.register = async (req, res) => {
  const { body: { login, name, password: sendPassword } } = req
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync(sendPassword, salt)
  const candidate = await User.findOne({login})

  if (candidate) {
    res.status(409).json({message: 'Пользователь с таким логином уже существует'})
  } else {
    const user = new User({ name, login, password })
    user.save()
    res.status(201).json(user)
  }
}
