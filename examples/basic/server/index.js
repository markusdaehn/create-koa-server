const Logger = require('../infrustructure/logging/logger');
const createLogger = (config) => {
  console.log('config>>>', config);
  return Logger(config.env, config.appName, config.logging)
};

//module.exports = require('create-koa-server')({createLogger, serverRoot: __dirname});
module.exports = require('../../../server')({ createLogger, serverRoot: __dirname });
