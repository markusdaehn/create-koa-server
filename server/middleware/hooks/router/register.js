module.exports = function register(initRoutes, router, getRoutes, server, logger) {
  initRoutes(router, getRoutes, server, logger);

  server.use(router.routes);
  server.use(router.allowedMethods());
}
