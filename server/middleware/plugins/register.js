module.exports = function register(path, getPlugins, PLUGINS_FOLDER, app, logger) {
  logger.trace('server.middleware.plugins.register > : registering plugins');

  let pluginsDir = path.join(app.root, PLUGINS_FOLDER);

  logger.debug(`server.middleware.plugins.register: getting plugins at ${pluginsDir}`);
  let plugins = getPlugins(pluginsDir, logger);

  Object.keys(plugins).forEach((pluginName)=> {
    plugins[pluginName].register(app, logger);
  });

  logger.trace('server.middlware.plugins.register < ');
}
