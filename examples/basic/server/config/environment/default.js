
module.exports = function create(envVars) {
  const root = envVars.SERVER_ROOT;

  return {
    server: {
      env: 'default',

      ip: envVars.IP,
      port: envVars.PORT,

      root
    },

    logging: {
     level: 'error',
     file: envVars.LOG_PATH
    }
  };
}
