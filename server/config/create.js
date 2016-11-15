module.exports = create;

function create(fs, path, env, merge, root, envConfig) {
  let baseConfig = createBaseConfig(env, root);
  let config = merge(baseConfig, envConfig || {});

  return config;
}


function createBaseConfig(env, root) {
  return {
    env: env.NODE_ENV || 'development',

    ip: env.IP || undefined,
    port: env.PORT || 8080,

    root,

    logging: {
     level: 'error',
     file: env.LOG_PATH || `${root}/logs/log.txt`
    }
  };
}
