module.exports = function createApps(getObjectKeys, createApp, config, logger) {
  const apps = getObjectKeys(config).map((mountPrefix) => createApp(config[mountPrefix], logger));

  return apps;
}
