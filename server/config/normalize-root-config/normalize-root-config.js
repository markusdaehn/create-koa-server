module.exports = function normalizeRootConfig(freeze, getObjectKeys, serverConfigPropertyKeys, rootConfig) {
  const MOUNT_PREFIX = ROOT_APP_CFG_KEY = '/';
  let configs = {};

  configs.server = rootConfig.server || {};
  configs[ROOT_APP_CFG_KEY] = {};

  getObjectKeys(rootConfig).forEach((key) => {
    if(key.startsWith(MOUNT_PREFIX)) {
      // @NOTE: application configs begin with /, the mount prefix
      // copy application config from the root config to the new config
      configs[key] = rootConfig[key];
    } else if(serverConfigPropertyKeys.includes(key)) {
      // copy server configs from the root config to the server property of the new config
      configs.server[key] = rootConfig[key];
    } else if(key !== 'server'){
      // copy all other configs from the root config (except the server property) to the root application propety of the new config.
      // This includes the server property
      // if it exists.
      configs[ROOT_APP_CFG_KEY][key] = rootConfig[key];
    }

  });

  return freeze(configs);
}
