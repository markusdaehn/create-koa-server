module.exports = function register(bunyanLogger, createBunyanConfig, server, logger) {
  server.use(bunyanLogger(logger));
  server.use(bunyanLogger.requestIdContext());
  server.use(bunyanLogger.requestLogger(createBunyanConfig(server, logger)));
}
