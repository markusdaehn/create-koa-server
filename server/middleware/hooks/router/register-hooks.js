module.exports = function registerHooks(getHooks, router, server, logger) {
  logger.info('server.middleware.hooks.router.register-hooks > : registering router hooks');
  let hooks = getHooks(server, logger);

  Object.keys(hooks).forEach((hookName)=> {
    hooks[hookName].register(router, server, logger);
  });

  logger.info('server.middleware.hooks.router.register-hooks <');
}
