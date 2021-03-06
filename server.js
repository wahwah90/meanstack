var express = require('express')
var bodyParser = require('body-parser')


var app = express()
app.use(bodyParser.json())

app.use(require('./controllers/api/post'))
app.use(require('./controllers/static'))
app.use(require('./auth'))

app.use('/api/sessions',require('./controllers/api/sessions'))
app.use('/api/users',require('./controllers/api/users'))

var server = app.listen(3000,function(){
	console.log('Server listening',3000)
})

require('./websockets').connect(server)