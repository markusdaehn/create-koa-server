module.exports = function register(router, initRoutes, registerHooks, server, logger) {
  logger.info(`server.middleware.hooks.router.register > : registering router middleware (root=${server.root})`);

  registerHooks(router, server, logger);
  initRoutes(router, server, logger);

  server.use(router.routes());
  server.use(router.allowedMethods());

  logger.info('server.middleware.hooks.router.register <');
  return router;
}
