const path = require('path');
const getConfigs = require('./index');
const { assert } = require('chai');

describe.only('server.config.get-configs()', () => {
  const logger = createLogger()
  describe('when passed server root with multiple apps', () => {
    const serverRoot = path.resolve(__dirname, '../../../tests/scenarios/server/multiple-apps');
    const configs = getConfigs(serverRoot, logger)

    it('should return a configs dictionary with /api defined', () => {
      assert.isDefined(configs['/api'], 'The /api config was not defined');
    });

    it('should return a configs dictionary with / defined', () => {
      assert.isDefined(configs['/'], 'The / config was not defined');
    });

    it('should return a configs with only two keys', () => {
      assert.equal(Object.keys(configs).length, 2, 'The number of configs were not 2');
    });

  });
});

function createLogger() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    trace: () => {},
    debug: () => {}
  }
}
