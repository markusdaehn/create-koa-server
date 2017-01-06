module.exports = function register(path, getPlugins, PLUGINS_FOLDER, app, logger) {
  let plugins = {};
  for(let i = 0; i < app.roots.length; i++){
    let pluginsDir = path.join(app.roots[i], PLUGINS_FOLDER);
    let currentPlugins = getPlugins(pluginsDir, logger);
    let pluginNames = Object.keys(currentPlugins);

    logger.info(`server.middleware.plugins.register: found ${pluginNames.length} plugins at ${pluginsDir}`);

    pluginNames.forEach((pluginName)=> {
      if(plugins[pluginName]) logger.info(`server.middleware.plugins.register: overriding plugin ${pluginName} with plugin found at ${pluginDir}`);
      plugins[pluginName] = currentPlugins[pluginName];
    });
  }


  Object.keys(plugins).forEach((pluginName)=> {
    logger.info(`server.middleware.plugins.register: registering plugin ${pluginName}`);
    plugins[pluginName].register(app, logger);
  });
}
