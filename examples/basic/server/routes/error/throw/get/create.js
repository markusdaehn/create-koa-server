module.exports = function createRoute(config, logger) {
  return {
    verb: 'get',
    uriTemplate: '/error/throw',
    endpoint: function * () {
      throw new Error('Throwing up!');
    }
  };
}
