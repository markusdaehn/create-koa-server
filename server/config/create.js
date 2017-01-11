module.exports = function create(applyDefaults, createEnv, deepMerge, BASE_CONFIG_NAME, logger, processEnv, serverRoot) {
  let config = {};

  try {
    const env = applyDefaults(logger, processEnv, serverRoot);

    let baseConfig = createEnv(logger, env, serverRoot, BASE_CONFIG_NAME);
    let envConfig = createEnv(logger, env, serverRoot, env.NODE_ENV);

    config = deepMerge(baseConfig, envConfig);
  } catch(e) {
    logger.info({exception: e}, 'server.config.create: error finding config');
  }

  return config;
}
