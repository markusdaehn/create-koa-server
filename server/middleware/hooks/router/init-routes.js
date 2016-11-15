
module.exports = function initRoutes(router, getRoutes, server, logger) {
  getRoutes(server.root).forEach(function(route) {
    router[route.verb](route.uriTemplate, route.endpoint);
  });

  return router;
}
