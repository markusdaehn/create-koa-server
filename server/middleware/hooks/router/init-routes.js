
module.exports = function initRoutes(path, getRoutes, ROUTES_FOLDER, router, app, logger) {
  logger.trace(`server.middleware.hooks.router.initRoutes > : root=${app.root}`);

  getRoutes(ROUTES_FOLDER, app, logger).forEach(function(route) {
    logger.debug(`server.middleware.hooks.router.initRoutes: registering route with verb ${route.verb} and uri template ${route.uriTemplate}`)
    router[route.verb](route.uriTemplate, route.endpoint);
  });

  logger.trace('server.middleware.hooks.router.initRoutes <');
  return router;
}
