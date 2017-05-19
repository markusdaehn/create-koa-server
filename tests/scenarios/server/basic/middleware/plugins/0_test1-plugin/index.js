module.exports = {
  register: (app, logger) => {
    app.use(function*() {})
    logger.trace('server.middlware.plugins.0_test1-plugin > < : called')
  }
}
