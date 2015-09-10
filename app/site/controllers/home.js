var express = require('express');

var home = express.Router();

home.use('/static', express.static('./app/site/static/build/'))
home.use('/templates', express.static('./app/site/templates/'))
home.use('/', express.static('./app/site/views/'))

module.exports = home
