const BASE_CONFIG_NAME = 'default';

module.exports = function create(applyDefaults, createEnvConfig, deepMerge, logger, envVars, configPath) {
  try {
    envVars = applyDefaults(logger, envVars, configPath);

    let baseConfig = createEnvConfig(logger, envVars, configPath, BASE_CONFIG_NAME);
    let envConfig = createEnvConfig(logger, envVars, configPath, envVars.NODE_ENV || baseConfig.appName || 'application');

    return deepMerge(baseConfig, envConfig);
  } catch(e) {
    logger.info({exception: e}, 'server.config.create: error finding config');
  }

  return {};
}
