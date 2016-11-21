const config = require('./config');
const logger = require('../infrustructure/logging/logger')(config.app.name, config);

module.exports = require('create-koa-server')(config, logger);
