module.exports = function create(createEnv, merge, env) {
  const DEFAULT_CONFIG = 'default';

  let defaultConfig = createEnv(DEFAULT_CONFIG);
  let envConfig = createEnv(env);

  let config = merge(defaultConfig, envConfig || {});

  return config;
}
