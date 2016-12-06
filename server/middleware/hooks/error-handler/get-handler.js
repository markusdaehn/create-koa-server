module.exports = function getHandler(getHooks, defaultHandler, server, logger) {
  let hooks = getHooks(server, logger);

  return hooks.length > 0 ? hooks[0] : defaultHandler;
}
