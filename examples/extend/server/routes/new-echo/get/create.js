module.exports = function createRoute(config, logger) {
  return {
    verb: 'get',
    uriTemplate: '/new-echo',
    endpoint: function * () {
      this.log.trace('server.routes.new-echo.get >');

      let resp = {config, echo: 'new-echo'};

      this.log.debug('server.routes.new-echo.get:', resp);

      this.body = resp;
      this.status = 200;

      this.log.trace('server.routes.new-echo.get <');
    }
  };
}
