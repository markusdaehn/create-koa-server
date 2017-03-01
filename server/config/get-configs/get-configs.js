module.exports = function getConfigs(getRootConfig, getAppConfigs, extend, freeze, serverRoot, logger) {
  const appConfigs = getAppConfigs(serverRoot, logger);
  const rootConfigs = getRootConfig(serverRoot, logger);
  const configs = extend(rootConfigs, appConfigs);

  return freeze(configs);
}
