module.exports = function createEnv(getModule, path, CONFIG_ENV_FOLDER, logger, processEnv, root, configName) {
  if (!configName) {
    return () => { return {}; };
  }

  return getModule(path.join(root, CONFIG_ENV_FOLDER, configName))(processEnv, root);
}
