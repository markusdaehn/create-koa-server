module.exports = function getDefaults(getModule, path, freeze, DEFAULT_CONFIGS_NAME, CONFIG_FOLDER, logger, root) {
  let defaults = {};

  try {
    let filePath = path.join(root, CONFIG_FOLDER, DEFAULT_CONFIGS_NAME);
    defaults = getModule(filePath)(root);
  } catch(exception) {
    logger.error({exception}, 'server.config.getDefaults');
  }

  if(!defaults.PORT) {
    defaults.PORT = 8080;
  }

  return freeze(defaults);
}
