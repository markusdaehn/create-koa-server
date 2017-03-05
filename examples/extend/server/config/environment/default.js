const path = require('path');

module.exports = function create(envVars) {
  return {
    env: 'default',

    ip: envVars.IP,
    port: envVars.PORT,

    root: path.resolve(__dirname, '../..'),
    appName: `extend-app-${envVars.NODE_ENV}`,
    logging: {
      level: envVars.LOG_LEVEL,
      path: envVars.LOG_PATH
    }
  };
}
