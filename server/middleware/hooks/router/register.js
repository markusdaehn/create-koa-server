module.exports = function register(Router, initRoutes, registerHooks, app, logger) {
  logger.trace(`server.middleware.hooks.router.register > : (root=${app.root})`);

  let router = new Router();

  registerHooks(router, app, logger);
  initRoutes(router, app, logger);

  app.use(router.routes());
  app.use(router.allowedMethods());

  logger.trace('server.middleware.hooks.router.register <');
  return router;
}
