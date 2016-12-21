const R = require('ramda');
const path = require('path');
const fs = require('fs');
const constants = require('../helpers/constants');
const getDirectories = R.curry(require('../helpers/get-directories'))(fs, path);
const getAppConfigs = R.curry(require('./get-app-configs'))(path, getDirectories);
const { create: createApp } = require('./factory');
const sinon = require('sinon');
const { assert } = require('chai');



describe('server apps register -- integration', () => {
  let register;
  let sandbox;
  let createAppSpy;
  let getAppConfigsSpy;
  let appsDir;
  let server;
  let logger;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    createAppSpy = sandbox.spy(createApp);
    getAppConfigsSpy = sandbox.spy(getAppConfigs);
    logger = createLogger(sandbox);
    server = createServer(sandbox);
    appsDir =  `${server.root}${constants.APPS_FOLDER}`;
    register = R.curry(require('./register'))(path, createAppSpy, getAppConfigsSpy, constants.APPS_FOLDER);
    register(server, logger);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when register is called', () => {
    it(`should call getAppConfigs with ${appsDir}`, () => {
      assert.equal(getAppConfigsSpy.args[0][0], appsDir, 'get-app-configs was not called with the expected apps directory');
    });
  });
});

function createServer(sandbox) {
  return {
    root: path.resolve(__dirname, '../../tests/scenarios/multiple-apps-server'),
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
