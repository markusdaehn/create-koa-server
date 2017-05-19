module.exports = {
  register: (app, logger) => {
    app.use(function*() {})
    logger.trace('server.middleware.plugins.0_test2-plugin > < : called')
  }
}
