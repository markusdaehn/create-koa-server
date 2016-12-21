module.exports = function register(path, createApp, getAppConfigs, APPS_FOLDER, server, logger) {
  let appsDir = path.join(server.root, APPS_FOLDER);
  let apps = getConfigs(getAppConfigs, appsDir, server, logger)
              .map((config) => createApp(config, logger));

  apps.forEach((app) => app.register(server, logger));
  server.apps = apps;

  return apps;
}

function getConfigs(getAppConfigs, appsDir, server, logger) {
  let appConfigs = getAppConfigs(appsDir, logger);

  if(appConfigs.length === 0) {
    appConfigs.push({
      prefix: '/',
      root: server.root
    });
  }
  return appConfigs;
}
