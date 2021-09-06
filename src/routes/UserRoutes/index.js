'use strict'
const express = require('express')
const userRoutes = express.Router()
const User = require('../../models/User')
const jwt = require('jsonwebtoken')

const AuthenticationController = require('../../controllers/authentication.controller')

const passport = require('passport')

// Get all user in the db
userRoutes.route('/all').get(function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(new Error(err))
    } else if (users.length == 0) {
      res.send(null)
    } else {
      res.json(users)
    }
  })
})

userRoutes.route('/login').post(function (req, res) {
  //console.log(req.body)
  const token = AuthenticationController.signUserToken(req.body)
  //console.log(token)
  User.findOne(function(err, user) {})
  passport.authenticate('local', { session: false }, (err, user, message) => {
    if (err) {
      // you should log it
      return res.status(500).send(err)
    } else if (!user) {
      // you should log it
      return res.status(403).send(message)
    } else {

      return res.send({ token })
    }
  })(req, res)
})

userRoutes.route('/user').get(function (req, res) {
  passport.authenticate('jwt', { session: false }, (err, user, message) => {
    if (err) {
      // you should log it
      return res.status(400).send(err)
    } else if (!user) {
      // you should log it
      return res.status(403).send({ message })
    } else {
      return res.send({ user })
    }
  })(res, req)
})

userRoutes.route('/register').post(async function (req, res) {
  const password = req.body.password
  const email = req.body.email
  const hashedPassword = await AuthenticationController.generatePasswordHash(password)

  await AuthenticationController.CreateUser(email, hashedPassword)

    .then(() => {
      res.send({ message: 'An account has been created!' })
    }).catch((err) => {
      throw err
    })
})

// create a User item
userRoutes.route('/add').post(function (req, res) {
  //console.log(req.body.email);
  User.create(
    {
      email: req.body.email,
      password: req.body.password,
    },
    function (error, user) {
      if (error) {
        res.status(400).send('Unable to create user')
      }
      res.status(200).json(user)
    }
  )
})

// Delete a user item
userRoutes.route('/delete/:id').get(function (req, res, next) {
  const id = req.params.id
  User.findByIdAndRemove(id, function (err, user) {
    if (err) {
      return next(new Error('user was not found'))
    } else if (user === null) {
      res.send(null)
    } else {
      console.log('Route found')
      res.json('Successfully removed' + user)
    }
  })
})

// perform update on user item
userRoutes.route('/update/:id').post(function (req, res, next) {
  const id = req.params.id
  User.findById(id, function (error, user) {
    if (error) {
      return next(new Error('user was not found'))
    } else if (user === null) {
      res.send(null)
    } else {
      let new_name = req.body.name

      user.updateOne({name: new_name}, function (err, res_mongo) {
        if (err) {
          return next(new Error('Could not update user'))
        } else {
          res.json('Row Updated')
        }
      });
    }
  })
})

module.exports = userRoutes
