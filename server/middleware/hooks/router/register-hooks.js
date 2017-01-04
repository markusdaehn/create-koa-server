module.exports = function registerHooks(path, getHooks, HOOKS_ROUTER_FOLDER, router, app, logger) {
  let hooks = {};

  for(let i = app.roots.length -1; i >= 0; i--) {
    let hooksDir = path.join(app.roots[i], HOOKS_ROUTER_FOLDER);
    let currentHooks = getHooks(hooksDir, logger);
    let hookNames = Object.keys(currentHooks);

    logger.info(`server.middlware.hooks.router.register-hooks: found ${hookNames.length} router hooks at ${hooksDir}`);

    hookNames.forEach((hookName) => {
      if(hooks[hookName]) logger.info(`server.middlware.hooks.router.register-hooks: overriding router hook ${hookName} with hook found at ${hooksDir}`);
      hooks[hookName] = currentHooks[hookName];
    });
  }


  Object.keys(hooks).forEach((hookName) => {
    logger.debug(`server.middlware.hooks.router.register-hooks: registering router hook ${hookName}`)
    hooks[hookName].register(router, app, logger);
  });
}
