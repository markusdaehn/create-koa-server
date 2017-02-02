
const R = require('ramda');
const path = require('path');
const fs = require('fs');
const sinon = require('sinon');
const constants = require('../../constants');
const getAppDirectories = require('./index');
const { assert } = require('chai');

describe('server apps get-app-configs -- integration', () => {
  let logger;
  let serverRoot;
  let sandbox;
  const expected_app_prefixes = ['api'];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    serverRoot = path.resolve(__dirname, '../../../tests/scenarios/server/multiple-apps');
    logger = createLogger(sandbox);
  });

  context('when called with apps dir path', () => {
    it('should return two app configs', () => {
      let configs = getAppDirectories(serverRoot, logger);

      assert.isTrue(configs.map((c) => c.name).includes('api'), 'Did not recieved expected app api');
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
