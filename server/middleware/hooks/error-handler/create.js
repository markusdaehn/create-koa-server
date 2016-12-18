module.exports = function create(path, getHandler, HOOKS_ERROR_HANDLER_FOLDER, app, logger) {
  logger.trace('server.middleware.hooks.error-handler.create > < : creating error handling middleware');

  let handlerDir = path.join(app.root, HOOKS_ERROR_HANDLER_FOLDER);
  let handle = getHandler(handlerDir, logger);

  return function * (next) {
    try {
      yield next;
    } catch (error) {
      handle(this, error, app, logger);
    }
  }
}
