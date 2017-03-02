module.exports = function createApps(getObjectKeys, createApp, config, logger) {
  const MOUNT_PREFIX = '/';
  const apps = getObjectKeys(config)
                .filter(key => key.startsWith(MOUNT_PREFIX))
                .map((mountPrefix) => createApp(config[mountPrefix], logger));

  return apps;
}
