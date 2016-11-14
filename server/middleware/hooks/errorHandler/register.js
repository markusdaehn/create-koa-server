module.exports = function register(create, server, logger) {
  server.use(create(server, logger));
}
