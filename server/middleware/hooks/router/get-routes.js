module.exports = function getRoutes(getRoute, glob, path, ROUTES_FOLDER, app, logger) {
  let routes = [];
  for(let i =  0; i < app.roots.length; i++) {
    let currentRoutes = glob.sync(path.resolve(app.roots[i], `.${ROUTES_FOLDER}/**/index.js`), { cwd: app.roots[i], ignore:['./*']}).map(function(file) {
      logger.debug(`server.middleware.hooks.router.getRoutes: getting route: ${file}`);

      let route = getRoute(file);
      //@NOTE: The route can be a plain old object, or a function accepting a config and a logger.
      route = typeof route === 'function' ? route(app.config, logger) : route;
      logger.info(`server.middleware.hooks.router.getRoutes: Found route with uri template ${route.uriTemplate}`);

      return route;
    });

    routes = routes.concat(currentRoutes);
  }

  return routes;
}
