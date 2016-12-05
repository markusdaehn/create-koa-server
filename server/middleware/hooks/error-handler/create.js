module.exports = function create(getHandler, server, logger) {
  logger.trace('server.middleware.hooks.error-handler.create > < : creating error handling middleware');

  let handle = getHandler(server, logger);

  return function * (next) {
    try {
      yield next;
    } catch (error) {
      handle(this, error, server, logger);
    }
  }
}
