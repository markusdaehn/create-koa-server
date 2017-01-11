module.exports = function applyDefaults(getDefaults, assign, getKeys, freeze, logger, envVars, serverRoot) {
  const defaults = getDefaults(logger, serverRoot);

  let envVarsCopy = assign({}, envVars);

  for(let key of getKeys(defaults)) {
    if(!envVarsCopy[key]) {
      envVarsCopy[key] = defaults[key];
    }
  }

  return freeze(envVarsCopy);
}
