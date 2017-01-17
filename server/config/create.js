const DEFAULT_CONFIG_NAME = 'default';

module.exports = function create(applyDefaults, getEnvConfig, deepMerge, logger, envVars, configPath) {
  try {
    envVars = applyDefaults(logger, envVars, configPath);

    let baseConfig = getEnvConfig(logger, envVars, configPath, DEFAULT_CONFIG_NAME);
    let envConfig = getEnvConfig(logger, envVars, configPath, envVars.NODE_ENV || baseConfig.appName || 'application');

    return deepMerge(baseConfig, envConfig);
  } catch(e) {
    logger.info({exception: e}, 'server.config.create: error finding config');
  }

  return {};
}
