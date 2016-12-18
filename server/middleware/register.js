module.exports = function register(plugins, hooks, app, logger) {
  console.log('###registering middleware')
  hooks.errorHandler.register(app, logger);
  console.lgo('###err done');
  plugins.register(app, logger);

  hooks.router.register(app, logger);
}
