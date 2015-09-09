var express = require('express')

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080

server.listen(port, function() {
    console.log('SERVER IS ON...')
});

app.use('/static', express.static('./app/site/static/build/'))
app.use('/templates', express.static('./app/site/templates/'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/site/index.html');
});

var people = {}

app.post('/users', function(req, res) {
    res.send(people)
})

io.on('connection', function (socket) {
    socket.on('user_connect', function(userDetails) {
        people[socket.id] = userDetails.username
        io.emit('user_connect', {username:people[socket.id]})
        io.emit('users_list', people)
    })

    socket.on('disconnect', function() {
        if (people[socket.id]){
            io.emit('user_disconnect', {username:people[socket.id]})
            delete people[socket.id]
            io.emit('users_list', people)
        }
    })

    socket.on('message', function(message) {
        io.emit('message', {message:message, username:people[socket.id]})
    })

    socket.on('typing', function() {
        socket.broadcast.emit('typing', {username:people[socket.id]})
    })
});
