assets = {
    scss:{
        source:'./site/static/client/scss/app.scss',
        watch:'./site/static/client/scss/*.scss',
        dest:'./site/static/build/css/'
    },
    js:{
        source:['./site/static/client/js/app.js'],
        dest:{
            path:'./site/static/build/js/',
            filename:'app.js',
        },
        watch:['./site/static/client/js/**/*.js']
    },
    vendorjs:{
        source:['./site/static/client/bower_components/angular/angular.js'],
        dest:{
            path:'./site/static/build/js/',
            filename:'vendor.js',
        }
    }
}

var gulp = require('./gulp/development');
