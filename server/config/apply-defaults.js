module.exports = function applyDefaults(getDefaults, assign, getKeys, freeze, logger, processEnv, serverRoot) {
  const defaults = getDefaults(logger, serverRoot);
  let env = assign({}, processEnv);

  for(let key of getKeys(defaults)) {
    if(!env[key]) {
      env[key] = defaults[key];
    }
  }

  return freeze(env);
}
