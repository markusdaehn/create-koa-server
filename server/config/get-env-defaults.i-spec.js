const getEnvDefaults = require('./get-env-defaults');
const path = require('path');
const { assert } = require('chai');

describe('server.config.get-env-defaults -- integration', () => {
  context('when there is a valid default', () => {
    const configPath = path.resolve(__dirname, '../../tests/scenarios/server/basic/config');
    let expected;
    let defaults;
    let logger;

    beforeEach(() => {
      logger = createLogger();
      defaults = getEnvDefaults(require, path.join, Object.freeze, logger, configPath);
      expected = {
        PORT: 8080,
        LOG_PATH: `${path.resolve(__dirname, '../../tests/scenarios/server/basic')}/logs/log.txt`,
        LOG_LEVEL: 'error'
      };
    });

    it('should return the default values', () => {
      assert.deepEqual(defaults, expected, 'The defaults did not match');
    });
  });
});

function createLogger() {
  return {
    error: () => {},
    warn: () => {},
    debug: () => {},
    trace: () => {},
    info: () => {}
  };
}
