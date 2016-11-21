module.exports = function register(initRoutes, server, logger) {
  logger.info(`register > : registering router middleware (root=${server.root})`);
  let router = initRoutes(server, logger);

  server.use(router.routes());
  server.use(router.allowedMethods());

  logger.info('register <');
  return router;
}
