const CONFIG_FOLDER = 'config';

module.exports = function getConfigs (joinPath, freeze, getAppDirectories, getConfig, serverRoot, logger) {
  const configs = {};

  getAppDirectories(serverRoot, logger).forEach((dir) => {
    const mountPrefix = joinPath('/', dir.name);
    const configPath = joinPath(dir.path, CONFIG_FOLDER);

    let config = getConfig(configPath) || {};

    config.__mountPrefix__ = mountPrefix;
    config.__appRoots__ = [dir.path];

    configs[mountPrefix] = freeze(config);
  });

  return configs;
}
