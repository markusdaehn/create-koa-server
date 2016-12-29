module.exports = function createEnv(getModule, path, CONFIG_ENV_FOLDER, processEnv, root, configName) {
  return getModule(path.join(root, CONFIG_ENV_FOLDER, configName))(processEnv);
}
