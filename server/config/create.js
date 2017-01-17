const DEFAULT_CONFIG_NAME = 'default';
const configs = {};

module.exports = function create(applyDefaults, getEnvConfig, deepMerge, logger, envVars, configPath) {
  try {
    if(configs[configPath]) return configs[configPath];

    envVars = applyDefaults(logger, envVars, configPath);

    let baseConfig = getEnvConfig(logger, envVars, configPath, DEFAULT_CONFIG_NAME);
    let envConfig = getEnvConfig(logger, envVars, configPath, envVars.NODE_ENV || baseConfig.appName || 'application');

    return configs[configPath] = deepMerge(baseConfig, envConfig);
  } catch(e) {
    logger.info({exception: e}, 'server.config.create: error finding config');
  }

  return configPath ? configs[configPath] = {} : {};
}
