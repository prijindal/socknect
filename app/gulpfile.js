assets = {
    scss:{
        source:'./site/static/client/scss/app.scss',
        watch:'./site/static/client/scss/*.scss',
        dest:'./site/static/build/css/'
    }
}

var gulp = require('./gulp/development');
