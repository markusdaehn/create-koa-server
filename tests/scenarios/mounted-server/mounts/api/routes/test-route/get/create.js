module.exports = function createRoute (log, config, logger) {
  return {
    verb: 'get',
    uriTemplate: '/entry',
    endpoint: function * () {
      log('Executing API entry point');
      this.body = 'API Entry Point';
      this.status = 200;
    }
  };
}
