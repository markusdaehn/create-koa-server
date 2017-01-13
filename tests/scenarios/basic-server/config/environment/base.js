const path = require('path');

module.exports = function create(envVars) {
  return {
    env: 'base',

    ip: envVars.IP,
    port: envVars.PORT,

    root: path.resolve(__dirname, '../..'),
    appName: `basic-app-${envVars.NODE_ENV}`,
    logging: {
      level: envVars.LOG_LEVEL,
      path: envVars.LOG_PATH
    }
  };
}
