module.exports = function register(path, createApp, getAppConfigs, APPS_FOLDER, server, logger) {
  let appsDir = path.join(server.root, APPS_FOLDER);
  let apps = getAppConfigs(appsDir, server, logger)
              .map((config) => createApp(config, logger));

  apps.forEach((app) => app.register(server, logger));
  server.apps = apps;

  return apps;
}
