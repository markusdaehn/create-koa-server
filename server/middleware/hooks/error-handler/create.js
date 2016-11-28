module.exports = function createErrorHandler(handle, server, logger) {
  return function * (next) {
    try {
      yield next;
    } catch (error) {
      handle(this, error, server, logger);
    }
  }
}
