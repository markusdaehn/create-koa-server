
module.exports = register

function register(router, getRoutes, server, logger) {
  getRoutes(server.root).forEach(function(route) {
    router[route.verb](route.uriTemplate, route.endpoint);
  });

  server.use(router.routes());
}
