const { assert } = require('chai');
const path = require('path');
const { CONFIG_FOLDER, CONFIG_ENV_FOLDER } = require('../constants');
const createEnv = require('./create-env');

describe('server config create-env -- integration', () => {
  const root = path.resolve(__dirname, '../../tests/scenarios/basic-server');
  ['production', 'development', 'test'].forEach((env) => {
    context(`when calling create-env with '${env}'`, () => {
      it(`should return an object with a property server.env equal to '${env}'`, () => {
        let logger = createLogger();
        let config = createEnv(require, path, CONFIG_ENV_FOLDER, logger, {}, root, env);

        assert.equal(config.server.env, env, 'The config did not have the correct environment');
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
