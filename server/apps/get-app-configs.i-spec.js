
const R = require('ramda');
const path = require('path');
const fs = require('fs');
const sinon = require('sinon');
const constants = require('../constants');
const getDirectories = R.curry(require('../utils/get-directories'))(fs, path);
const getAppConfigs = R.curry(require('./get-app-configs'))(path, getDirectories);
const { assert } = require('chai');

describe('server apps get-app-configs -- integration', () => {
  let appsDir;
  let logger;
  let server;
  let sandbox;
  const expected_app_prefixes = ['api'];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    appsDir = path.resolve(__dirname, path.join('../../tests/scenarios/multiple-apps-server', constants.APPS_FOLDER));
    server = {root:path.resolve(__dirname, '../../tests/scenarios/multiple-apps-server')};
    logger = createLogger(sandbox);
  });

  context('when called with apps dir path', () => {
    it('should return two app configs', () => {
      let configs = getAppConfigs(appsDir, server, logger);
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
