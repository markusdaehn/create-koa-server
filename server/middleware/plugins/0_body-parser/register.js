module.exports = function register(bodyParser, server, logger) {
  server.use(bodyParser());
}
