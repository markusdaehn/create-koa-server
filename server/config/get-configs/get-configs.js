const CONFIG_FOLDER = 'config';

module.exports = function getConfigs (joinPath, getAppDirectories, getConfig, serverRoot, logger) {
  const configs = {};
  getAppDirectories(serverRoot, logger).forEach((dir) => {
    const configKey = joinPath('/', dir.name);
    const configPath = joinPath(dir.path, CONFIG_FOLDER);
    const config = getConfig(configPath);

    configs[configKey] = config;
  });
  return configs;
}
