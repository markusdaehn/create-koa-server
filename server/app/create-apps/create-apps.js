const CONFIG_FOLDER = 'config';

module.exports = function createApps(joinPath, getConfig, createApp, getAppDirectories, serverRoots, logger) {



  const apps = configs.map((config) => createApp(config, logger));

  return apps;
}
