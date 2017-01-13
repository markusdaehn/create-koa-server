module.exports = function createEnv(getModule, joinPath, logger, envVars, configPath, configName) {
  if (!configName) {
    console.info('server.config.create-env: missing a config name, returning an empty config');
    return {};
  }

  try {
    let configFile = joinPath(configPath, 'environment', configName);
    let config = getModule(configFile);

    return typeof config === 'function' ? config(envVars) : config;
  } catch(e) {
    logger.info({exception: e}, 'server.config.create-env');
  }

  return {};
}
