module.exports = function register(bodyParser, server, logger) {
  logger.trace('server.middleware.plugins.bodyParser.register > < : registering body parser plugin.');
  server.use(bodyParser());
}
