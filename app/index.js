var express = require('express')

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80, function() {
    console.log('SERVER IS ON...')
});

app.use('/static', express.static('./site/static/'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/site/index.html');
});


var people = {}

io.on('connection', function (socket) {
    socket.on('user_connect', function(userDetails) {
        people[socket.id] = userDetails.username
        socket.broadcast.emit('user_connect', {username:people[socket.id]})
        socket.broadcast.emit('users-list', people)
    })

    socket.on('disconnect', function() {
        console.log('User Disconnected',{username:people[socket.id]})
        socket.broadcast.emit('user_disconnect', {username:people[socket.id]})
        delete people[socket.id]
        socket.broadcast.emit('users-list', people)
    })

    socket.on('message', function(message) {
        socket.broadcast.emit('message', {message:message, username:people[socket.id]})
    })

    socket.on('typing', function() {
        socket.broadcast.emit('typing', {username:people[socket.id]})
    })
});
