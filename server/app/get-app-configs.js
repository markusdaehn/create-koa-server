
module.exports = function getAppConfigs(path, getDirectories, appsDir, server, logger) {
  let appConfigs = getDirectories(appsDir, logger).map((directory) => {
    return {
      prefix: path.join('/', directory.name),
      root: directory.path
    };
  });

  if(appConfigs.length === 0) {
    appConfigs.push({
      prefix: '/',
      root: server.root
    });
  }

  return appConfigs;
}
