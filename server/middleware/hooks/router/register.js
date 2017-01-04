module.exports = function register(Router, initRoutes, registerHooks, app, logger) {
  let router = new Router();

  registerHooks(router, app, logger);
  initRoutes(router, app, logger);

  app.use(router.routes());
  app.use(router.allowedMethods());

  return router;
}
