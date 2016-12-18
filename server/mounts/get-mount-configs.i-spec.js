
const R = require('ramda');
const path = require('path');
const fs = require('fs');
const sinon = require('sinon');
const constants = require('../helpers/constants');
const getDirectories = R.curry(require('../helpers/get-directories'))(fs, path);
const getMountConfigs = R.curry(require('./get-mount-configs'))(path, getDirectories);
const { assert } = require('chai');

describe('server mounts get-mount-configs -- integration', () => {
  let mountsDir;
  let logger;
  let sandbox;
  const expected_mount_prefixes = ['api'];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    mountsDir = path.resolve(__dirname, path.join('../../tests/scenarios/mounted-server', constants.MOUNTS_FOLDER));
    logger = createLogger(sandbox);
  });

  context('when called with mounts dir path', () => {
    it('should return two mount configs', () => {
      let configs = getMountConfigs(mountsDir, logger);
      assert.isTrue(configs.map((c) => c.prefix).includes('/api'), 'Did not recieved expected mount api');
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
