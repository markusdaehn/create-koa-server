module.exports = function registerHooks(getHooks, router, server, logger) {
  let hooks = getHooks(server, logger);

  Object.keys(hooks).forEach((hookName)=> {
    hooks[hookName].register(router, server, logger);
  });
}
