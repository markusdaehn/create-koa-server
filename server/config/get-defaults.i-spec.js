const getDefaults = require('./get-defaults');
const path = require('path');
const { DEFAULT_CONFIGS_NAME, CONFIG_FOLDER } = require('../constants');
const { assert } = require('chai');

describe('server.config.get-defaults -- integration', () => {
  context('when there is a valid default', () => {
    const serverRoot = path.resolve(__dirname, '../../tests/scenarios/basic-server');
    let expected;
    let defaults;
    let logger;

    beforeEach(() => {
      logger = createLogger();
      defaults = getDefaults(require, path, Object.freeze, DEFAULT_CONFIGS_NAME, CONFIG_FOLDER, logger, serverRoot);
      expected = {
        IP: undefined,
        PORT: 8080,
        LOG_PATH: `${serverRoot}/logs/log.txt`,
        LOG_LEVEL: 'error'
      };
    });

    it('should return the default values', () => {
      console.log('###defaults', defaults);
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
