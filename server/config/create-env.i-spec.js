const { assert } = require('chai');
const getEnvVars = require('./get-env-vars');
const createEnv = require('./create-env');
const path = require('path');

describe('server config create-env -- integration', () => {
  const DEFAULT_SERVER_ROOT = __dirname;
  ['production', 'development', 'test'].forEach((env) => {
    context(`when calling create-env with '${env}'`, () => {
      it(`should return an object with a property server.env equal to '${env}'`, () => {

        let envVars = getEnvVars(path, Object.freeze, __dirname, {NODE_ENV: env});
        let config = createEnv(require, envVars, env);

        assert.equal(config.server.env, env, 'The config did not have the correct environment');
      });
    });
  });
});
