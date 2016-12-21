module.exports = function register(bunyanLogger, createBunyanConfig, server, logger) {
  logger.info('server.middlewarelogger::register > < : registering bunyan logger plugin');

  server.use(bunyanLogger(logger));
  server.use(bunyanLogger.requestIdContext());
  server.use(bunyanLogger.requestLogger(createBunyanConfig(server, logger)));
}
