module.exports = function register(plugins, hooks, app, logger) {
  hooks.errorHandler.register(app, logger);
  plugins.register(app, logger);
  hooks.router.register(app, logger);
}
