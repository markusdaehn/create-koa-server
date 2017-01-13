const DEFAULT_CONFIG_FILE_NAME = 'defaults';

module.exports = function getEnvDefaults(getModule, joinPath, freezeObject, logger, configPath) {
  try {
    let filePath = joinPath(configPath, DEFAULT_CONFIG_FILE_NAME);
    return freezeObject(getModule(filePath)(configPath));
  } catch(exception) {
    logger.error({exception}, 'server.config.get-env-defaults');
  }

  return {};
}
