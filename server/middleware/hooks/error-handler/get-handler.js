module.exports = function getHandler(getObjectKeys, getHooks, defaultHandler, server, logger) {
  let hooks = getHooks(server, logger);
  let hookNames = getObjectKeys(hooks);

  if(hookNames.length > 0) {
    logger.info({func: 'server.middleware.hooks.error-handler.get-handler'}, `${hookNames[0]} error handler returned`);
    return hooks[hookNames[0]];
  } else {
    logger.info({func: 'server.middlware.hooks.error-handler.get-handler'}, 'Default error handler returned');
    return defaultHandler;
  }
}
