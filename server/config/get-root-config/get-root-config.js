const CONFIG_FOLDER = 'config';

module.exports = function getServerConfig(nullableLogger, joinPath, freeze, getConfig, normalize, serverRoot, logger) {
  const configPath = joinPath(serverRoot, CONFIG_FOLDER);

  logger = logger || nullableLogger;

  return freeze(normalize(getConfig(configPath) || {}));
}
