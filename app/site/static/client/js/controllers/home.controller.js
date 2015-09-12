angular.module('Socknet')
        .controller('appCtrl',
          ['$scope','$filter', 'Auth', 'mainSocket',
          function($scope, $filter, Auth, mainSocket){

          var self = this;
          var user = Auth.getUser();
          console.log(user);
          self.current = user
          self.logout = Auth.logout
          self.messages = []
          self.users = []
          self.typing = {}

          $scope.getCurrentTime = function(date) {
            return $filter('timeAgo')(date)
          }

          self.getMessages = function(username) {
            var count = 0;
            for (var i = self.messages.length - 1; i >= 0; i--) {
              if(self.messages[i].username == username) {
                count++;
              }
            }
            return count
          }

          var typingTimer;
          var messageInput = angular.element('#message');

          self.resetTimer = function() {
              clearTimeout(typingTimer);
          }

          self.type = function() {
              console.log(this)
              clearTimeout(typingTimer);
              setTimeout(doneTyping, 2000)
              mainSocket.type()
          }

          doneTyping = function() {
              console.log('Done Typing')
              mainSocket.stopType()
          }

          self.send = function(message) {
            mainSocket.send(self.message)
            self.message = ''
          }


          mainSocket.user_connect(function(data) {
            data.time = new Date()
            console.log('New User Connected:',data)
            self.messages.push({
                type:'alert', connect:1,username:data.username,time:data.time
              })
            $scope.$digest()
          })

          mainSocket.users_list(function(data) {
            console.log('List of users', data)
            self.users = data
            $scope.$digest()
          })

          mainSocket.user_disconnect(function(data) {
            data.time = new Date()
            console.log('User Disconnected',data)
            self.messages.push({
                type:'alert', connect:0,username:data.username,time:data.time
              })
            $scope.$digest()
          })

          mainSocket.typing(function(data) {
            //console.log('Someone is typing',data)
            self.typing[data.username] = 1;
            console.log(self.typing)
            $scope.$digest()
        })

        mainSocket.stop_typing(function(data) {
            //console.log('Someone stopped typing', data)
            delete self.typing[data.username]
            console.log(self.typing)
            $scope.$digest()
        })

        mainSocket.message(function(data) {
          data.time = new Date()
          console.log('Someone said',data)
          self.messages.push({
              type:'chat',username:data.username, message:data.message, time:data.time
            })
          $scope.$digest()
          var messageContainer = angular.element('#message-container')
          messageContainer.scrollTop(99999999999999999999);
        })
        mainSocket.refresh_users()
      }])
