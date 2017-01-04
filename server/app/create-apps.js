module.exports = function createApps(path, createApp, getAppConfigs, serverRoots, logger) {
  return getAppConfigs(serverRoots, logger)
              .map((config) => createApp(config, logger));

}
