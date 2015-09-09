var env = process.env.NODE_ENV || 'development'

var gulp;

assets = {
    scss:{
        source:'./site/static/client/scss/app.scss',
        watch:'./site/static/client/scss/*.scss',
        dest:'./site/static/build/css/'
    },
    js:{
        source:[
            './site/static/client/js/app.js',
            './site/static/client/js/controllers/*.js',
            './site/static/client/js/services/*.js'
        ],
        dest:{
            path:'./site/static/build/js/',
            filename:'app.js',
        },
        watch:['./site/static/client/js/**/*.js']
    },
    vendorjs:{
        source:[
            './site/static/client/bower_components/angular/angular.js',
            './site/static/client/bower_components/angular-route/angular-route.js',
            './site/static/client/bower_components/angular-timeago/dist/angular-timeago.js'
        ],
        dest:{
            path:'./site/static/build/js/',
            filename:'vendor.js',
        }
    }
}

if(env == 'development') {
    gulp = require('./gulp/development.js')
}
else {
    gulp = require('./gulp/production.js')
}
