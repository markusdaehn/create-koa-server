module.exports = function register(router, server, logger) {
  logger.trace('server.middleware.hooks.router.health-checker.register > < : registering health-checker router hook.');

  router.get('/health-check', checkHealth);
}

function * checkHealth(){
  this.status = 202;
  this.body = {
    succeeded: true,
    payload: 'Healthy as newborn!'
  }
}
