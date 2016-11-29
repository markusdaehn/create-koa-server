module.exports = function register(create, server, logger) {
  logger.trace('server.middlware.hooks.error-handler.register > : registering error handler');

  server.use(create(server, logger));

  logger.trace('server.middlware.hooks.error-handler.register <');
}
