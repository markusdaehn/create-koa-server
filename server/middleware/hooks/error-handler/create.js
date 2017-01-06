module.exports = function create(path, getHandler, HOOKS_ERROR_HANDLER_FOLDER, defaultHandler, app, logger) {
  logger.trace('server.middleware.hooks.error-handler.create > < : creating error handling middleware');

  let handle;
  for(let i = 0 ; i < app.roots.length; i++) {
    let handlerDir = path.join(app.roots[i], HOOKS_ERROR_HANDLER_FOLDER);
    handle = getHandler(handlerDir, logger);
    if(handle) break;
  }


  handle = handle || defaultHandler;

  return function * (next) {
    try {
      yield next;
    } catch (error) {
      handle(this, error, app, logger);
    }
  }
}
