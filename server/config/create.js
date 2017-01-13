const BASE_CONFIG_NAME = 'base';

module.exports = function create(applyDefaults, createEnv, deepMerge, logger, envVars, configPath) {
  try {
    envVars = applyDefaults(logger, envVars, configPath);

    let baseConfig = createEnv(logger, envVars, configPath, BASE_CONFIG_NAME);
    let envConfig = createEnv(logger, envVars, configPath, envVars.NODE_ENV || baseConfig.appName || 'application');

    return deepMerge(baseConfig, envConfig);
  } catch(e) {
    logger.info({exception: e}, 'server.config.create: error finding config');
  }

  return {};
}
