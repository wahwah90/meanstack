var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt    = require('jwt-simple')
var config = require('../../config')
var User   = require('../../models/user')

router.post('/', function (req, res, next) {
  var username = req.body.username
  User.findOne({username: username})
  .select('password')
  .exec(function (err, user) {
  	console.log('abc')
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    	console.log('cde')
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      	console.log('efg')
      if (!valid) { return res.sendStatus(401) }
      	console.log(req.body.password)
      var token = jwt.encode({username: username}, config.secret)
      console.log(token)
      res.send(token)
    })
  })
})

module.exports = router
