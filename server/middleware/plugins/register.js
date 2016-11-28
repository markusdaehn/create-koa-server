module.exports = function register(getPlugins, server, logger) {
  logger.info('server.middleware.plugins.register > : registering plugins');
  let plugins = getPlugins(server, logger);

  Object.keys(plugins).forEach((pluginName)=> {
    plugins[pluginName].register(server, logger);
  });
  
  logger.info('server.middlware.plugins.register < ');
}
