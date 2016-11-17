module.exports = function getEnvVars(path, freeze, dirname, envVars) {
  const root = envVars.SERVER_ROOT || path.resolve(dirname, '../');

  return freeze({
    SERVER_ROOT: root,
    IP: envVars.IP || undefined,
    PORT: envVars.PORT || 8080,
    NODE_ENV: envVars.NODE_ENV,
    LOG_PATH: envVars.LOG_PATH || `${root}/logs/log.txt`
  });
}
