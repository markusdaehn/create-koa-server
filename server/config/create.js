module.exports = function create(applyDefaults, createEnv, deepMerge, BASE_CONFIG_NAME, logger, processEnv, root) {
  const env = applyDefaults(logger, processEnv, root);
  let baseConfig = createEnv(logger, env, root, BASE_CONFIG_NAME);
  let envConfig = createEnv(logger, env, root, env.NODE_ENV);

  let config = deepMerge(baseConfig, envConfig || {});

  return config;
}
