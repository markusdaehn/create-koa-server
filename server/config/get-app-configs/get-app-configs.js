const CONFIG_FOLDER = 'config';
const ROOT_MOUNT_PREFIX = '/';

module.exports = function getAppConfigs (nullableLogger, joinPath, freeze, getAppDirectories, getConfig, normalize, serverRoot, logger) {
  const configs = {};
  logger = logger || nullableLogger;

  getAppDirectories(serverRoot, logger).forEach((dir) => {
    const mountPrefix = joinPath(ROOT_MOUNT_PREFIX, dir.name);
    const configPath = joinPath(dir.path, CONFIG_FOLDER);

    let config = getConfig(configPath) || {};

    config.__mountPrefix__ = mountPrefix;
    config.__appRoots__ = [dir.path];

    configs[mountPrefix] = config;
  });

  return freeze(normalize(configs));
}
