module.exports = function register(create, app, logger) {
  logger.trace('server.middlware.hooks.error-handler.register > : registering error handler');

  app.use(create(app, logger));

  logger.trace('server.middlware.hooks.error-handler.register <');
}
