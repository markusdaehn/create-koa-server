module.exports = function createEnv(get, envVars, environment) {
  console.log('###envVarsj=', envVars)
  return get(`./environment/${environment}`)(envVars);
}
