module.exports = function createEnv(getModule, path, CONFIG_ENV_FOLDER, logger, processEnv, serverRoot, configName) {
  if (!configName) {
    console.warn('server.config.create-env: missing a config name, returning an empty config');
    return {};
  }
  let configFilePath = path.join(serverRoot, CONFIG_ENV_FOLDER, configName);

  return getModule(configFilePath)(processEnv, serverRoot);
}
