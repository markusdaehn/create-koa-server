const R = require('ramda');
const path = require('path');
const fs = require('fs');
const constants = require('../constants');
const getDirectories = R.curry(require('../utils/get-directories'))(fs, path);
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
  let serverRoot;
  let logger;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    createAppSpy = sandbox.spy(createApp);
    getAppConfigsSpy = sandbox.spy(getAppConfigs);
    logger = createLogger(sandbox);
    serverRoot = path.resolve(__dirname, '../../tests/scenarios/multiple-apps-server');
    appsDir =  `${serverRoot}${constants.APPS_FOLDER}`;
    register = R.curry(require('./create-apps'))(path, createAppSpy, getAppConfigsSpy, constants.APPS_FOLDER);
    register(serverRoot, logger);
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


function createLogger(sandbox) {
  return {
    error: sandbox.spy(),
    debug: sandbox.spy(),
    trace: sandbox.spy(),
    info: sandbox.spy()
  }
}
