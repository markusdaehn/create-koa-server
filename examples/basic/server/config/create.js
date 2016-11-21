module.exports = function create(createEnv, merge) {
  const DEFAULT_CONFIG = 'default';

  let defaultConfig = createEnv(DEFAULT_CONFIG);
  let envConfig = createEnv(defaultConfig.server.env);

  let config = merge(defaultConfig, envConfig || {});

  return config;
}
