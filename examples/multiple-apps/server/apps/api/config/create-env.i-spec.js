const { assert } = require('chai');
const getEnvVars = require('./get-env-vars');
const createEnv = require('./create-env');

describe('server config create-env -- integration', () => {
  const DEFAULT_SERVER_ROOT = __dirname;
  ['production', 'development', 'test'].forEach((env) => {
    context(`when calling create-env with '${env}'`, () => {
      it(`should return an object with a property server.env equal to '${env}'`, () => {

        let envVars = getEnvVars({env: {NODE_ENV: env}}, DEFAULT_SERVER_ROOT);
        let config = createEnv(require, envVars, env);
        assert.equal(config.server.env, env, 'The config did not have the correct environment');
      });
    });
  });
});
