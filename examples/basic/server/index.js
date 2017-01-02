const config = require('./config');
const logger = require('../infrustructure/logging/logger')(config.env, config.app.name, config.app.logging);

//module.exports = require('create-koa-server')(config, logger);
module.exports = require('../../../server')({config, logger});
