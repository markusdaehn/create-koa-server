module.exports = function register(getPlugins, server, logger) {
  let plugins = getPlugins(server, logger);

  Object.keys(plugins).forEach((pluginName)=> {
    plugins[pluginName].register(server, logger);
  });
}
