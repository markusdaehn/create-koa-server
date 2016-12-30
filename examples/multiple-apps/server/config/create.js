module.exports = function create(createEnv, deepMerge, env) {
  const DEFAULT_CONFIG = 'base';

  let defaultConfig = createEnv(DEFAULT_CONFIG);
  let envConfig = createEnv(env);

  let config = deepMerge(defaultConfig, envConfig || {});

  return config;
}
