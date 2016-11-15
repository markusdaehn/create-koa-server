const config = require('./config');
const koa = require('koa');
const middleware = require('./middleware');

const server = require('./create')(koa, logger, config, root, middleware);

module.exports = server;
