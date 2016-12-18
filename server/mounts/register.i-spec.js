const R = require('ramda');
const path = require('path');
const fs = require('fs');
const constants = require('../helpers/constants');
const getDirectories = R.curry(require('../helpers/get-directories'))(fs, path);
const getMountConfigs = R.curry(require('./get-mount-configs'))(path, getDirectories);
const { create: createApp } = require('../app-factory');
const sinon = require('sinon');
const { assert } = require('chai');



describe('server mounts register -- integration', () => {
  let register;
  let sandbox;
  let createAppSpy;
  let getMountConfigsSpy;
  let mountsDir;
  let server;
  let logger;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    createAppSpy = sandbox.spy(createApp);
    getMountConfigsSpy = sandbox.spy(getMountConfigs);
    logger = createLogger(sandbox);
    server = createServer(sandbox);
    mountsDir =  `${server.root}${constants.MOUNTS_FOLDER}`;
    register = R.curry(require('./register'))(path, createAppSpy, getMountConfigsSpy, constants.MOUNTS_FOLDER);
    register(server, logger);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when register is called', () => {
    it(`should call getMountConfigs with ${mountsDir}`, () => {
      assert.equal(getMountConfigsSpy.args[0][0], mountsDir, 'get-mount-configs was not called with the expected mounts directory');
    });
  });
});

function createServer(sandbox) {
  return {
    root: path.resolve(__dirname, '../../tests/scenarios/mounted-server'),
    use: sandbox.stub()
  };
}

function createLogger(sandbox) {
  return {
    error: sandbox.spy(),
    debug: sandbox.spy(),
    trace: sandbox.spy(),
    info: sandbox.spy()
  }
}
