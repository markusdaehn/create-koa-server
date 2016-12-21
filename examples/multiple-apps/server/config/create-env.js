module.exports = function createEnv(get, envVars, environment) {
  return get(`./environment/${environment}`)(envVars);
}
