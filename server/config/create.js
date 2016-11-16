module.exports = create;

function create(createBaseConfig, getEnvironmentConfig) {
  let baseConfig = createBaseConfig();
  let envConfig = getEnvironmentConfig();
  
  let config = merge(baseConfig, envConfig || {});

  return config;
}
