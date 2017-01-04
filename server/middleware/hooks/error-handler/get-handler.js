module.exports = function getHandler(getObjectKeys, getHooks, handlerDir, logger) {
  let hooks = getHooks(handlerDir, logger);
  let hookNames = getObjectKeys(hooks);
  let handler = null;

  if(hookNames.length > 0) {
    logger.info({func: 'server.middleware.hooks.error-handler.get-handler'}, `${hookNames[0]} error handler returned`);
    handler = hooks[hookNames[0]];
  }

  return handler;
}
