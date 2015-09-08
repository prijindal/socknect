angular.module('Socknet')
        .service('Auth',['$location', 'mainSocket', function($location, mainSocket){
            var details = {}
            mainSocket.init()
            var login = function(userDetails) {
              details = userDetails
              mainSocket.login(details.username)
            } 

            var getUser = function() {
              return details.username
            }

            var isLoggedIn = function() {
              return details.username != undefined
            }

            var logout = function() {
              details = {}
              mainSocket.logout()
              $location.path('/')
            }

            return {
              login:login,
              getUser:getUser,
              isLoggedIn:isLoggedIn,
              logout:logout
            }
        }])