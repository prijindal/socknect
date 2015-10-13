angular.module('Socknet', [
        'ngRoute',
        'yaru22.angular-timeago'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl:'templates/login.html',
            controller:'loginCtrl',
            controllerAs:'login'
        })
        .when('/app', {
            templateUrl:'templates/app.html',
            controller:'appCtrl',
            controllerAs:'app'
        })
        .when('/user', {
            templateUrl:'templates/user.html',
            controller:'appCtrl',
            controllerAs:'app'
        })

        $routeProvider
        .otherwise({
            redirectTo:'/'
        })
    }])
    .run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function(event) {
            if (Auth.isLoggedIn()) {
                //$location.path('/app')
            }
            else {
                $location.path('/')
            }
        })
    }])
