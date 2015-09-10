module.exports = {
    people:{},
    server:function(app) {
        var self = this;
        var server = require('http').Server(app);
        var io = require('socket.io')(server);

        io.on('connection', function (socket) {
            socket.on('refresh_users', function(userDetails) {
                io.emit('users_list', self.people)
            })

            socket.on('user_connect', function(userDetails) {
                self.people[socket.id] = userDetails.username
                io.emit('user_connect', {username:self.people[socket.id]})
                io.emit('users_list', self.people)
            })

            socket.on('disconnect', function() {
                if (self.people[socket.id]){
                    io.emit('user_disconnect', {username:self.people[socket.id]})
                    delete self.people[socket.id]
                    io.emit('users_list', self.people)
                }
            })

            socket.on('message', function(message) {
                io.emit('message', {message:message, username:self.people[socket.id]})
            })

            socket.on('typing', function() {
                socket.broadcast.emit('typing', {username:self.people[socket.id]})
            })

            socket.on('stop_typing', function() {
                socket.broadcast.emit('stop_typing', {username:self.people[socket.id]})
            })
        });

        return server
    }
}
