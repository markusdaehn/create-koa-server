const path = require('path');
const getConfigs = require('./index');
const { assert } = require('chai');

describe('server.config.get-app-configs()', () => {
  const logger = createLogger()
  describe.only('when passed server root with app in the apps folder', () => {
    const serverRoot = path.resolve(__dirname, '../../../tests/scenarios/server/multiple-apps');
    const configs = getConfigs(serverRoot, logger)
      assert.isDefined(configs['/api'], 'The /api config was not defined');
      it('should return a configs dictionary with /api defined', () => {
    });

    it('should return a configs dictionary with / defined', () => {
      assert.isDefined(configs['/'], 'The / config was not defined');
    });

    it('should return a configs with only two keys', () => {
      assert.equal(Object.keys(configs).length, 2, 'The number of configs were not 2');
    });
  });

  describe('when passed server root with app at the root', () => {
    const serverRoot = path.resolve(__dirname, '../../../tests/scenarios/server/basic');
    const configs = getConfigs(serverRoot, logger)

    it('should return a configs dictionary with /api defined', () => {
      assert.isDefined(configs['/'], 'The /api config was not defined');
    });
    it('should return a configs with only 1 key', () => {
      assert.equal(Object.keys(configs).length, 1, 'The number of configs were not 1');
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
