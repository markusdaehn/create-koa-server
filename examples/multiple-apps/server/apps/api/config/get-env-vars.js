
module.exports = function getEnvVars(envVars, defaultRoot) {
  const root = envVars.SERVER_ROOT || defaultRoot;

  return Object.freeze({
    SERVER_ROOT: root,
    IP: envVars.IP || undefined,
    PORT: envVars.PORT || 8080,
    NODE_ENV: envVars.NODE_ENV,
    LOG_PATH: envVars.LOG_PATH || `${root}/logs/log.txt`,
    LOG_LEVEL: envVars.LOG_LEVEL || 'error'
  });
}
