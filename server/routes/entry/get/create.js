module.exports = function createRoute(log) {
  return {
    verb: 'get',
    uriTemplate: '/home',
    endpoint: function * () {
      log('Inside Home endpoint');
      this.body = 'Home';
      this.status = 200;
    }
  };
}
