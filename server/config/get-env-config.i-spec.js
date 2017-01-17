const { assert } = require('chai');
const path = require('path');
const getEnvConfig = require('./get-env-config');

describe('server config create-env -- integration', () => {
  const configPath = path.resolve(__dirname, '../../tests/scenarios/basic-server/config');
  ['production', 'development', 'test'].forEach((env) => {
    context(`when calling create-env with '${env}'`, () => {
      it(`should return an object with a property server.env equal to '${env}'`, () => {
        let logger = createLogger();
        let config = getEnvConfig(require, path.join, logger, {}, configPath, env);

        assert.equal(config.env, env, 'The config did not have the correct environment');
      });
    });
  });
});

function createLogger() {
  return {
    error: () => {},
    warn: () => {},
    info: () => {},
    trace: () => {},
  };
}
