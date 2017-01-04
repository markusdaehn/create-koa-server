module.exports = function createApps(path, createApp, getAppConfigs, APPS_FOLDER, serverRoot, logger) {
  let appsDir = path.join(serverRoot, APPS_FOLDER);

  return getAppConfigs(appsDir, serverRoot, logger)
              .map((config) => createApp(config, logger));

}
