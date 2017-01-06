
module.exports = function create(envVars) {
  const root = envVars.SERVER_ROOT;

  return {
    env: 'default',

    ip: envVars.IP,
    port: envVars.PORT,

    root,

    name: `basic-app-${envVars.NODE_ENV}`,
    logging: {
      level: envVars.LOG_LEVEL,
      path: envVars.LOG_PATH
    }
  };
}
