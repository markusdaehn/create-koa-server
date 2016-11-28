module.exports = function createErrorHandler(handle, server, logger) {
  logger.info('server.middleware.hooks.error-handler.create > < : creating error handling middleware')
  return function * (next) {
    try {
      yield next;
    } catch (error) {
      handle(this, error, server, logger);
    }
  }
}
