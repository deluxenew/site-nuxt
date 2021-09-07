const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.all = async (req, res, next) => {
  User.find(function (err, users) {
    if (err) {
      return next(new Error(err))
    } else if (users.length === 0) {
      res.send(null)
    } else {
      res.json(users)
    }
  })
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

      const findUserAgent = tokens.find(({userAgent}) => userAgent === headerUserAgent)
      if (!findUserAgent) {
        await User.findOneAndUpdate({login: req.body.login}, {$push: {tokens: {token, userAgent: headerUserAgent}}})
        const {'_doc': newUser} = await User.findOne({login: req.body.login})

        res.json({user: newUser, token})
      } else {
        res.json({is: 'est uzhe', user: oldUser, token})
      }

    } else {
      res.status(403).json({message: 'Проверьте имя пользователя или пароль'})
    }
  } else {
    res.status(404).json({message: 'Проверьте имя пользователя или пароль'})
  }
}

module.exports.logoutAll = async (req, res) => {
  const {body: {login}} = req
  const findUser = await User.findOne({login})

  if (findUser) {
    await User.findOneAndUpdate({login}, {tokens: []})

    const updatedUser = await User.findOne({login: req.body.login})
    if (updatedUser) {
      const {'_doc': {tokens}} = updatedUser

      if (tokens && tokens.length === 0) res.json({tokens, message: 'Congratulation! All your devices is not logged!!'})
      else res.status(500).json({message: 'При попытке разлогиниться на всех устройствах произошла ошибка'})
    }
  }
}

module.exports.signup = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if (candidate) {
    res.status(409).json({message: 'Пользователь с таким логином уже существует'})
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })

    user.save()
    res.status(201).json(user)
  }
}
