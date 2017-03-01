
const path = require('path');

console.log('##>', envVars);

module.exports = function create(envVars) {
  return {
    env: envVars.NODE_ENV,

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
