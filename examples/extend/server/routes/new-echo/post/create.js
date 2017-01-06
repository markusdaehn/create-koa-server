module.exports = function createRoute(config, logger) {
  return {
    verb: 'post',
    uriTemplate: '/new-echo',
    endpoint: function * () {
      this.log.trace('server.routes.new-echo.post >');

      //@NOTE: Passing in this.log (which was set up by the logger plugin) instead of logger because it logs the request ID.
      let resp = {config, echo: this.request.body};

      this.log.debug('server.routes.new-echo.get:', resp);

      this.body = resp;
      this.status = 200;

      this.log.trace('server.routes.new-echo.post <');
    }
  };
}
