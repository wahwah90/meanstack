var express = require('express')
var router = express.Router()

router.use(express.static(__dirname+'/../assets'))
router.use(express.static(__dirname + '/../template'))
router.get('/', function(req,res){
	res.sendfile('layout/app.html')
})

module.exports = router
