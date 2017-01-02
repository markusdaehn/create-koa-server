module.exports = function createEnv(getModule, path, CONFIG_ENV_FOLDER, logger, processEnv, serverRoot, configName) {
  if (!configName) {
    return () => { return {}; };
  }

  return getModule(path.join(serverRoot, CONFIG_ENV_FOLDER, configName))(processEnv, serverRoot);
}
