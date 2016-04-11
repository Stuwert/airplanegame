var environment = process.env.NODE_ENV || 'development'
var config = require('../mongoosefile')[environment]

var mongoose = require('mongoose')
mongoose.connect(config)

module.exports = mongoose;
