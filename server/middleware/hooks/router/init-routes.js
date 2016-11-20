
module.exports = function initRoutes(router, getRoutes, server, logger) {
  logger.info(`initRoutes > : root=${server.root}`);

  getRoutes(server, logger).forEach(function(route) {
    logger.debug(`initRoutes: registering route with verb ${route.verb} and uri template ${route.uriTemplate}`)
    console.log('router', router);
    router[route.verb](route.uriTemplate, route.endpoint);
  });

  logger.info('initRoutes <');
  return router;
}
