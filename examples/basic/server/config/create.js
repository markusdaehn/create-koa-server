module.exports = function create(createEnv, deepMerge, env) {
  const DEFAULT_CONFIG = 'default';

  let defaultConfig = createEnv(DEFAULT_CONFIG);
  let envConfig = createEnv(env);

  let config = deepMerge(defaultConfig, envConfig || {});

  console.log('###config', config)
  return config;
}
