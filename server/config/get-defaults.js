module.exports = function getDefaults(getModule, path, freeze, DEFAULT_CONFIGS_NAME, CONFIG_FOLDER, logger, serverRoot) {
  let defaults = {};

  try {
    let filePath = path.join(serverRoot, CONFIG_FOLDER, DEFAULT_CONFIGS_NAME);
    defaults = getModule(filePath)(serverRoot);
  } catch(exception) {
    logger.error({exception}, 'server.config.getDefaults');
  }

  if(!defaults.PORT) {
    defaults.PORT = 8080;
  }

  return freeze(defaults);
}
