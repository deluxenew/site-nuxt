const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authUserSecret = 'sdaner12'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function (email, password, done) {
      await GetUser(email)
        .then((user) => {
          return user
        }).then(async (user) => {
          if (!user) {
            return done(null, false, { message: 'Authentication failed' })
          }
          const validation = await comparePasswords(password, user.password)
          if (validation) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Authentication failed' })
          }
        }).catch((err) => {
          return done(err)
        })
    }
  )
)

async function comparePasswords (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

function signUserToken(user) {
  console.log(user)
  return jwt.sign({
    id: user._id,
    email: user.email
  }, authUserSecret)
}

async function generatePasswordHash(plainPassword) {
  return await bcrypt.hash(plainPassword, 12)
}

async function CreateUser (email, password) {
  return await User.create({ email, password })
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })
}

async function GetUser(email) {
  return await User.findOne({ email })
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })
}

const JwtStrategy = require('passport-jwt').Strategy

const tokenExtractor = function (req) {
  let token = null
  if (req.req && req.req.cookies && req.req.cookies['auth._token.local']) {
    const rawToken = req.req.cookies['auth._token.local'].toString()
    token = rawToken.slice(rawToken.indexOf(' ') + 1, rawToken.length)
  } else if (req && req.cookies && req.cookies['auth._token.local']) {
    const rawToken = req.cookies['auth._token.local'].toString()
    token = rawToken.slice(rawToken.indexOf(' ') + 1, rawToken.length)
  }
  return token
}

passport.use(new JwtStrategy({
    jwtFromRequest: tokenExtractor,
    secretOrKey: authUserSecret
  },
  function (jwtPayload, done) {
    return GetUser(jwtPayload.email)
      .then((user) => {
        if (user) {
          return done(null, {
            email: user.email,
          })
        } else {
          return done(null, false, 'Failed')
        }
      })
      .catch((err) => {
        return done(err)
      })
  }
))

module.exports = {tokenExtractor , signUserToken, generatePasswordHash, CreateUser , GetUser}
