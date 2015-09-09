var env = process.env.NODE_ENV || 'development'

var gulp;

assets = {
    scss:{
        source:'./app/site/static/client/scss/app.scss',
        watch:'./app/site/static/client/scss/*.scss',
        dest:'./app/site/static/build/css/'
    },
    js:{
        source:[
            './app/site/static/client/js/app.js',
            './app/site/static/client/js/controllers/*.js',
            './app/site/static/client/js/services/*.js'
        ],
        dest:{
            path:'./app/site/static/build/js/',
            filename:'app.js',
        },
        watch:['./app/site/static/client/js/**/*.js']
    },
    vendorjs:{
        source:[
            './app/site/static/client/bower_components/angular/angular.js',
            './app/site/static/client/bower_components/angular-route/angular-route.js',
            './app/site/static/client/bower_components/angular-timeago/dist/angular-timeago.js'
        ],
        dest:{
            path:'./app/site/static/build/js/',
            filename:'vendor.js',
        }
    }
}

if(env == 'development') {
    gulp = require('./app/gulp/development.js')
}
else {
    gulp = require('./app/gulp/production.js')
}
