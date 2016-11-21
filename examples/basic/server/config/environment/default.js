
module.exports = function create(envVars) {
  const root = envVars.SERVER_ROOT;

  return {
    server: {
      env: 'default',

      ip: envVars.IP,
      port: envVars.PORT,

      root
    },
    app: {
      name: `basic-app-${envVars.NODE_ENV}`,
      logging: {
        level: envVars.LOG_LEVEL,
        path: envVars.LOG_PATH
      }
    }
  };
}
