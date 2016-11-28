module.exports = function register(router, initRoutes, server, logger) {
  logger.info(`register > : registering router middleware (root=${server.root})`);

  initRoutes(router, server, logger);

  server.use(router.routes());
  server.use(router.allowedMethods());

  logger.info('register <');
  return router;
}
