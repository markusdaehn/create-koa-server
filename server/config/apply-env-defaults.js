module.exports = function applyEnvDefaults(getDefaults, assign, getKeys, freezeObject, logger, envVars, configPath) {
  const defaults = getDefaults(logger, configPath);
  let envVarsCopy = assign({}, envVars);

  for(let key of getKeys(defaults)) {
    if(!envVarsCopy[key]) {
      envVarsCopy[key] = defaults[key];
    }
  }

  return freezeObject(envVarsCopy);
}
