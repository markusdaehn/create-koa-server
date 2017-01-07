
module.exports = function getAppConfigs(path, getDirectories, APPS_FOLDER, serverRoots, logger) {
  let appConfigs = [];

  for(let i = 0; i < serverRoots.length; i++) {
    let appsDir = path.join(serverRoots[i], APPS_FOLDER);
    let currentAppConfigs = getDirectories(appsDir, logger).map((directory) => {
      return {
        prefix: path.join('/', directory.name),
        roots: [directory.path]
      };
    }).forEach((currentConfig) => {
      let config = appConfigs.find((cfg) => { return cfg.prefix === currentConfig.prefix });

      //@NOTE: This is temporary, we will have to really get the config and merge. For now, just override.
      if(config) {
        config.roots.push(directory.path);
      } else {
        appConfigs.push(currentConfig);
      }
    });
  }

  if(appConfigs.length === 0) {
    appConfigs.push({
      prefix: '/',
      roots: serverRoots
    });
  }

  return appConfigs;
}
