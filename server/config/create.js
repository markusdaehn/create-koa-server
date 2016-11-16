module.exports = function create(createEnv, merge, envVars, root) {
  const DEFAULT_CONFIG = 'default';
  let defaultConfig = createEnv(envVars, root, DEFAULT_CONFIG);
  let envConfig = createEnv(envVars, root, defaultConfig.server.env);

  let config = merge(defaultConfig, envConfig || {});

  return config;
}
