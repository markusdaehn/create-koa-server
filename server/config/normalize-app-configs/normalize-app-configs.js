module.exports = function normalizeAppConfig(freeze, getObjectKeys, extend, serverConfigPropertyKeys, appConfigs) {
  const MOUNT_PREFIX = ROOT_APP_CFG_KEY = '/';
  const SERVER_KEY = 'server';
  let configs = {};

  configs[ROOT_APP_CFG_KEY] = {}

  // Copy all app configs to new config, except the root app config
  getObjectKeys(appConfigs).forEach((key) => {
    if(key === ROOT_APP_CFG_KEY) return;

    if(key.startsWith(MOUNT_PREFIX)) {
      configs[key] = appConfigs[key];
    } else if(key !== SERVER_KEY && !serverConfigPropertyKeys.includes(key) ) {
      configs[ROOT_APP_CFG_KEY][key] = appConfigs[key];
    }
  });

  // Copy or extend all application configs that are in the root application config
  getObjectKeys(appConfigs[ROOT_APP_CFG_KEY]).forEach((key) => {
    if(key.startsWith(MOUNT_PREFIX)) {
      configs[key] = configs[key] ? extend(configs[key], appConfigs[ROOT_APP_CFG_KEY][key]) : appConfigs[ROOT_APP_CFG_KEY][key];
    }
  });

  // Copy root application configs to new config
  getObjectKeys(appConfigs[ROOT_APP_CFG_KEY]).forEach((key) => {
    if(!key.startsWith(MOUNT_PREFIX) && key !== SERVER_KEY && !serverConfigPropertyKeys.includes(key)) {
      configs[ROOT_APP_CFG_KEY][key] = appConfigs[ROOT_APP_CFG_KEY][key];
    }
  });


  return freeze(configs);
}
