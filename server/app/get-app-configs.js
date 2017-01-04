
module.exports = function getAppConfigs(path, getDirectories, appsDir, serverRoot, logger) {
  let appConfigs = getDirectories(appsDir, logger).map((directory) => {
    return {
      prefix: path.join('/', directory.name),
      root: directory.path
    };
  });

  if(appConfigs.length === 0) {
    appConfigs.push({
      prefix: '/',
      root: serverRoot
    });
  }

  return appConfigs;
}
