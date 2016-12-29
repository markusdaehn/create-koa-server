module.exports = function create(path, createEnv, deepMerge, BASE_CONFIG_NAME, processEnv, root) {
  const env = applyDefaults(processEnv, root);
  let baseConfig = createEnv(env, root, BASE_CONFIG_NAME);
  let envConfig = createEnv(env, root, env.NODE_ENV);

  let config = deepMerge(baseConfig, envConfig || {});

  return config;
}

function applyDefaults(processEnv, root) {
  let env = Object.assign({}, processEnv);

  //@NOTE: fetch defaults from json file.
  env.IP = processEnv.IP || undefined,
  env.PORT = processEnv.PORT || 8080,
  env.NODE_ENV = processEnv.NODE_ENV,
  env.LOG_PATH = processEnv.LOG_PATH || `${root}/logs/log.txt`,
  env.LOG_LEVEL = processEnv.LOG_LEVEL || 'error'

  return Object.freeze(env);
}
