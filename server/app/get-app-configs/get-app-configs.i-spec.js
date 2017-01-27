
const R = require('ramda');
const path = require('path');
const fs = require('fs');
const sinon = require('sinon');
const constants = require('../../constants');
const getDirectories = R.curry(require('../../utils/get-directories'))(fs, path);
const extendConfig = require('../../config/extend');
const getAppConfigs = R.curry(require('./get-app-configs'))(path, getDirectories, extendConfig, constants.APPS_FOLDER);
const { assert } = require('chai');

describe('server apps get-app-configs -- integration', () => {
  let logger;
  let serverRoots;
  let sandbox;
  const expected_app_prefixes = ['api'];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    serverRoots = [path.resolve(__dirname, '../../../tests/scenarios/server/multiple-apps')];
    logger = createLogger(sandbox);
  });

  context('when called with apps dir path', () => {
    it('should return two app configs', () => {
      let configs = getAppConfigs(serverRoots, logger);

      assert.isTrue(configs.map((c) => c.prefix).includes('/api'), 'Did not recieved expected app api');
    });
  });
});

function createLogger(sandbox) {
  return {
    error: () => {},
    debug: () => {},
    info: () => {},
    trace: () => {}
  };
}
