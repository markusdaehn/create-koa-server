module.exports = function create(envVars, root) {
  return {
    server: {
      env: envVars.NODE_ENV || 'development',

      ip: envVars.IP || undefined,
      port: envVars.PORT || 8080,

      root
    },

    logging: {
     level: 'error',
     file: envVars.LOG_PATH || `${root}/logs/log.txt`
    }
  };
}
