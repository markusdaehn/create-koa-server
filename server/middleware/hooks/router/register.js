module.exports = function register(router, initRoutes, registerHooks, server, logger) {
  logger.info(`register > : registering router middleware (root=${server.root})`);

  registerHooks(router, server, logger);
  initRoutes(router, server, logger);

  server.use(router.routes());
  server.use(router.allowedMethods());

  logger.info('register <');
  return router;
}
