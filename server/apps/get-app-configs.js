
module.exports = function getAppConfigs(path, getDirectories, appsDir, logger) {
  return getDirectories(appsDir, logger).map((directory) => {
    return {
      prefix: path.join('/', directory.name),
      root: directory.path
    }
  });
}
