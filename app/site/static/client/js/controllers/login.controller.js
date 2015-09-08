angular.module('Socknet')
        .controller('loginCtrl',['$location', 'Auth', function($location, Auth){
          var self = this;
          self.submit = function() {
            Auth.login(self.user)
            if (Auth.isLoggedIn()) {
              $location.path('/app')
            };
          }
        }])
