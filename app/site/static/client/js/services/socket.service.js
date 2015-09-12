var socket;
angular.module('Socknet')
        .service('mainSocket.connection',[ function(){
          
          var init = function() {
            socket = io.connect()
          }


          var login = function(username) {
            socket.emit('user_connect',{username:username})
          }

          var logout = function() {
            socket.disconnect()
          }

          return {
            init:init,
            login:login,
            logout:logout

          }

        }])

        .service('mainSocket.emit', [ function(){

          var type = function() {
            socket.emit('typing')
          }

          var stopType = function() {
            socket.emit('stop_typing')
          }

          var send = function(data) {
            if (data) {
              socket.emit('message',data)
            }
          }

          var refresh_users = function() {
              socket.emit('refresh_users')
          }

          return {
            type:type,
            stopType:stopType,
            send:send,
            refresh_users:refresh_users
          }

        }])

        .service('mainSocket.on', [function(){
          
          var user_connect = function(callback) {
            socket.on('user_connect', callback)
          }

          var users_list = function(callback) {
            socket.on('users_list', callback)
          }

          var user_disconnect = function(callback) {
            socket.on('user_disconnect', callback)
          }

          var typing = function(callback) {
            socket.on('typing', callback)
          }

          var stop_typing = function(callback) {
            socket.on('stop_typing', callback)
          }

          var message = function(callback) {
            socket.on('message', callback)
          }

          return {
            user_connect:user_connect,
            users_list:users_list,
            user_disconnect:user_disconnect,
            typing:typing,
            stop_typing:stop_typing,
            message:message
          }

        }])

        .service('mainSocket',
        ['mainSocket.connection','mainSocket.emit','mainSocket.on',
        function(connection, emit, on){

          return {
            init:connection.init,
            login:connection.login,
            logout:connection.logout,

            type:emit.type,
            stopType:emit.stopType,
            send:emit.send,
            refresh_users:emit.refresh_users,

            user_connect:on.user_connect,
            users_list:on.users_list,
            user_disconnect:on.user_disconnect,
            typing:on.typing,
            stop_typing:on.stop_typing,
            message:on.message
          }
        }])
