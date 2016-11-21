const config = require('./config');
const logger = require('../infrustructure/logger');

module.exports = require('create-koa-server')(config, logger);
