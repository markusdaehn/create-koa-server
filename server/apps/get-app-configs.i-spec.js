
const R = require('ramda');
const path = require('path');
const fs = require('fs');
const sinon = require('sinon');
const constants = require('../helpers/constants');
const getDirectories = R.curry(require('../helpers/get-directories'))(fs, path);
const getMountConfigs = R.curry(require('./get-app-configs'))(path, getDirectories);
const { assert } = require('chai');

describe('server apps get-app-configs -- integration', () => {
  let appsDir;
  let logger;
  let sandbox;
  const expected_app_prefixes = ['api'];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    appsDir = path.resolve(__dirname, path.join('../../tests/scenarios/multiple-apps-server', constants.APPS_FOLDER));
    logger = createLogger(sandbox);
  });

  context('when called with apps dir path', () => {
    it('should return two app configs', () => {
      let configs = getMountConfigs(appsDir, logger);
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
