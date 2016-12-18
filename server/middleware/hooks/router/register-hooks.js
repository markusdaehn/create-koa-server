module.exports = function registerHooks(path, getHooks, HOOKS_ROUTER_FOLDER, router, app, logger) {
  logger.trace('server.middleware.hooks.router.register-hooks > : registering router hooks');

  let hooksDir = path.join(app.root, HOOKS_ROUTER_FOLDER);
  let hooks = getHooks(hooksDir, logger);

  Object.keys(hooks).forEach((hookName) => {
    logger.debug({hooks: {router: {name: hookName}}}, `registering router hook ${hookName}`)
    hooks[hookName].register(router, app, logger);
  });

  logger.trace('server.middleware.hooks.router.register-hooks <');
}
