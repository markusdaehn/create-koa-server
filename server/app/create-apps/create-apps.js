module.exports = function createApps(path, createApp, getAppConfigs, appRoots, logger) {
  const configs = getAppConfigs(appRoots, logger);
  const apps = configs.map((config) => createApp(config, logger));

  return apps;
}
