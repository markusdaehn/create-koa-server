module.exports = function createRoute(createEchoService, config, logger) {
  return {
    verb: 'get',
    uriTemplate: '/echo',
    endpoint: function * () {
      this.log.trace('server.routes.echo.get >');

      //@NOTE: Passing in this.log (which was set up by the logger plugin) instead of logger because it logs the request ID.
      let echoService = createEchoService(config, this.log);
      let resp = echoService.echo(null);

      this.log.debug('server.routes.echo.get:', resp);

      this.body = resp;
      this.status = 200;

      this.log.trace('server.routes.echo.get <');
    }
  };
}
