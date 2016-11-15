module.exports = function register(initRoutes, server, logger) {
  let router = initRoutes(server, logger);

  server.use(router.routes);
  server.use(router.allowedMethods());
}
