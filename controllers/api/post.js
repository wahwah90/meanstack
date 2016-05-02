var Post = require('../../models/post')
var router = require('express').Router()


	router.get('/api/posts', function(req,res,next){
		Post.find().sort('-date').exec(function(err,posts){
			console.log('abc')
			if(err){return next(err)}
			res.json(posts)
		})
	})


	router.post('/api/posts', function(req,res,next){
		var post = new Post({
			body:req.body.body
		})
		post.username = req.auth.username
		post.save(function(err,posts){
			if(err){ return next(err)}
			res.json(201,posts)
		})
	})
	module.exports = router
