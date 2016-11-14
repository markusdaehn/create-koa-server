module.exports = function register(bodyParser, server, logger) {
  logger.info('bodyParser::register > < : registering boddy parser plugin.');
  server.use(bodyParser());
}
