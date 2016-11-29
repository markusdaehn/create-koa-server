
module.exports = function initRoutes(getRoutes, router, server, logger) {
  logger.trace(`server.middleware.hooks.router.initRoutes > : root=${server.root}`);

  getRoutes(server, logger).forEach(function(route) {
    logger.debug(`server.middleware.hooks.router.initRoutes: registering route with verb ${route.verb} and uri template ${route.uriTemplate}`)
    router[route.verb](route.uriTemplate, route.endpoint);
  });

  logger.trace('server.middleware.hooks.router.initRoutes <');
  return router;
}
