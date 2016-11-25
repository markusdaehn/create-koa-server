module.exports = function createRoute(createEchoService, config, logger) {
  return {
    verb: 'post',
    uriTemplate: '/echo',
    endpoint: function * () {
      this.log.info('server.routes.echo.post >');

      //@NOTE: Passing in this.log (which was set up by the logger plugin) instead of logger because it logs the request ID.
      let echoService = createEchoService(config, this.log);
      let resp = echoService.echo(this.request.body);
      
      this.log.debug('server.routes.echo.get:', resp);

      this.body = resp;
      this.status = 200;

      this.log.info('server.routes.echo.post <');
    }
  };
}
