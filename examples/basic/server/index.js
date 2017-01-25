const Logger = require('../infrustructure/logging/logger');
const createLogger = (config) => {
  return Logger(config.env, config.appName, config.logging)
};

//module.exports = require('create-koa-server')({config, logger});
module.exports = require('../../../server')({createLogger, serverRoot: __dirname, envVars: process.env});
