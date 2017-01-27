const CONFIG_FOLDER_REL_PATH = 'config';
const configs = {};

module.exports = function extend(joinPath, getConfig, deepMerge, options) {
  let {logger, root, configs = []} = options;
  let configPath = joinPath(root, CONFIG_FOLDER_REL_PATH);

  if(!configs[configPath]) {
    let config = getConfig({logger, path: configPath});
    configs.push(config);

    configs[configPath] = {};

    configs.forEach((cfg) => {
      if(typeof cfg === 'object') configs[configPath] = deepMerge(configs[configPath], cfg);
    });
  }

  return configs[configPath];
}
