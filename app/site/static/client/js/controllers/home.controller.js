angular.module('Socknet')
        .controller('appCtrl', 
          ['$scope', '$http','$filter', 'Auth', 'mainSocket', 
          function($scope,$http, $filter, Auth, mainSocket){
          
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

          $http.post('/users')
                .success(function(data) {
                  self.users = data
                })

          self.type = function() {
            mainSocket.type()
          }

          self.send = function(message) {
            mainSocket.send(self.message)
            self.message = ''
          }


          mainSocket.user_connect(function(data) {
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
            console.log('User Disconnected',data)
            self.messages.push({
                type:'alert', connect:0,username:data.username,time:data.time
              })
            $scope.$digest()
          })

          mainSocket.typing(function(data) {
            console.log('Someone is typing',data)
            self.typing = data
            $scope.$digest()
          })

          mainSocket.message(function(data) {
            console.log('Someone said',data)
            self.messages.push({
                type:'chat',username:data.username, message:data.message, time:data.time
              })
            $scope.$digest()
          })
        }])