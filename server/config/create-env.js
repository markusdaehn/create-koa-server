module.exports = function createEnv(get, envVars, root, environment) {
  return get(`./environment/${environment}`)(envVars);
}
