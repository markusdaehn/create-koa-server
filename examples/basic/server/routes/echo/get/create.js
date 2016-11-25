module.exports = function createRoute(createEchoService, config, logger) {
  return {
    verb: 'post',
    uriTemplate: '/echo',
    endpoint: function * () {
      this.log.info('server.routes.echo.get >');

      //@NOTE: Passing in this.log (which was set up by the logger plugin) instead of logger because it logs the request ID.
      let echoService = createEchoService(config, this.log);

      this.body = echoService.echo();
      this.status = 200;

      this.log.info('server.routes.echo.get <');
    }
  };
}
