var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt    = require('jwt-simple')
var User   = require('../../models/user')
var config = require('../../config')

router.get('/', function (req, res, next) {
  console.log('lol')
  console.log(req.headers['x-auth'])
  if (!req.headers['x-auth']) {
    return res.sendStatus(401)
  }
   console.log('loa')
  var auth = jwt.decode(req.headers['x-auth'], config.secret)
  User.findOne({username: auth.username}, function (err, user) {
    if (err) { return next(err) }
       console.log('loc')
    res.json(user)
  })
})

router.post('/', function (req, res, next) {
  var user = new User({username: req.body.username})
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) { return next(err) }
    user.password = hash
    user.save(function (err) {
      if (err) { return next(err) }
      res.send(201)
    })
  })
})

module.exports = router
