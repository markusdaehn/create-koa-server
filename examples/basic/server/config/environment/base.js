
module.exports = function create(envVars, serverRoot) {
  const root = serverRoot;

  return {
    env: envVars.NODE_ENV,

    ip: envVars.IP,
    port: envVars.PORT,

    root,

    appName: `basic-app-${envVars.NODE_ENV}`,
    logging: {
      level: envVars.LOG_LEVEL,
      path: envVars.LOG_PATH
    }
  };
}
