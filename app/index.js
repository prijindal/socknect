var express = require('express')

var io = require('./socket/controller')
var app = express(app)
var server = io.server(app)
var port = process.env.PORT || 5000

server.listen(port, function() {
    console.log('SERVER IS ON...:',port)
});

app.use('/', require('./site/controllers/home.js'))
