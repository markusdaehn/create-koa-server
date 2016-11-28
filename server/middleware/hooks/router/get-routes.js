module.exports = function getRoutes(get, glob, path, server, logger) {
  logger.info(`server.middleware.hooks.router.getRoutes > : getting routes (root=${server.root})`);

  const routes = glob.sync(path.resolve(server.root, './routes/**/index.js'), { cwd: server.root, ignore:['./*']}).map(function(file) {
    logger.debug(`server.middleware.hooks.router.getRoutes: getting route: ${file}`);

    let route = get(file);

    //@NOTE: This is to be backwards compatible. The route can be a plain old object, or a function accepting a config and a logger.
    return typeof route === 'function' ? route(server.config, logger) : route;
  });

  logger.info('server.middleware.hooks.router.getRoutes <');
  return routes;
}
