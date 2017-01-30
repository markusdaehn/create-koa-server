module.exports = function getAppConfigs(path, getDirectories, extendConfig, APPS_FOLDER, appRoots, logger) {
  let configs = [];

  // @NOTE: We could have mulitpe app folders containing definitions
  // for the same app. This is to allow for extentions
  for(let i = 0; i < appRoots.length; i++) {
    let appsDir = path.join(appRoots[i], APPS_FOLDER);
    let directories = getDirectories(appsDir, logger);

    directories.forEach((directory) => {
      const prefix = path.join('/', directory.name)
      const config = configs.find((cfg) => { return cfg.prefix === prefix });

      //@NOTE: This is temporary, we will have to really get the config and merge. For now, just override.
      if(config) {
        config.roots.push(directory.path);
      } else {
        configs.push({
          prefix,
          roots: [directory.path]
        });
      }
    });
  }

  if(configs.length === 0) {
    configs.push({
      prefix: '/',
      roots: appRoots
    });
  }

  return configs;
}
