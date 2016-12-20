module.exports = function getRoutes(getRoute, glob, path, ROUTES_FOLDER, app, logger) {
  logger.trace(`server.middleware.hooks.router.getRoutes > : getting routes (root=${app.root})`);

  const routes = glob.sync(path.resolve(app.root, `.${ROUTES_FOLDER}/**/index.js`), { cwd: app.root, ignore:['./*']}).map(function(file) {
    logger.debug(`server.middleware.hooks.router.getRoutes: getting route: ${file}`);

    let route = getRoute(file);

    //@NOTE: The route can be a plain old object, or a function accepting a config and a logger.
    route = typeof route === 'function' ? route(app.config, logger) : route;

    logger.info(`Found route with uri template ${route.uriTemplate}`);

    return route;
  });

  logger.trace('server.middleware.hooks.router.getRoutes <');
  return routes;
}
