module.exports = function getRoutes(get, glob, path, server, logger) {
  logger.info(`getRoutes > : getting routes (root=${server.root})`);

  const routes = glob.sync(path.resolve(server.root, './routes/**/index.js'), { cwd: server.root, ignore:['./*']}).map(function(file) {
    logger.debug(`getRoutes: getting route: ${file}`);
    return get(file);
  });

  logger.info('getRoutes <');
  return routes;
}
