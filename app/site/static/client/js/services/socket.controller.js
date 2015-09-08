angular.module('Socknet')
        .service('mainSocket', function(){
          var socket;
          var init = function() {
            socket = io.connect('http://localhost')
          }

          var login = function(username) {
            socket.emit('user_connect',{username:username})
          }

          var logout = function() {
            socket.disconnect()
          }

          var type = function() {
            socket.emit('typing')
          }

          var send = function(data) {
            if (data) {
              socket.emit('message',data)
            }
          }


          var user_connect = function(callback) {
            socket.on('user_connect', function(data) {
              data.time = new Date()
               callback(data)
            })
          }

          var users_list = function(callback) {
            socket.on('users_list', function(data) {
              callback(data)
            })
          }

          var user_disconnect = function(callback) {
            socket.on('user_disconnect', function(data) {
              data.time = new Date()
              callback(data)
            })
          }

          var typing = function(callback) {
            socket.on('typing', function(data) {
              callback(data)
            })
          }

          var message = function(callback) {
            socket.on('message', function(data) {
              data.time = new Date()
              callback(data)
            })
          }
          return {
            init:init,
            login:login,
            logout:logout,
            type:type,
            send:send,
            user_connect:user_connect,
            users_list:users_list,
            user_disconnect:user_disconnect,
            typing:typing,
            message:message
          }
        })