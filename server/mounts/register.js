module.exports = function register(path, createApp, getMountConfigs, MOUNTS_FOLDER, server, logger) {
  let mountsDir = path.join(server.root, MOUNTS_FOLDER);
  let apps = getAppConfigs(getMountConfigs, mountsDir, server, logger)
              .map((config) => createApp(config, logger));

  apps.forEach((app) => app.register(server, logger));

  return apps;
}

function getAppConfigs(getMountConfigs, mountsDir, server, logger) {
  let appConfigs = getMountConfigs(mountsDir, logger);

  if(appConfigs.length === 0) {
    appConfigs.push({
      prefix: '/',
      path: server.root
    });
  }
  return appConfigs;
}
