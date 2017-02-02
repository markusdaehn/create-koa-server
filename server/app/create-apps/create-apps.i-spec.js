const R = require('ramda');
const path = require('path');
const fs = require('fs');
const getDirectories = R.curry(require('../../utils/get-directories'))(fs, path);
const extendConfig = require('../../config/extend');
const getAppDirectories = require('../get-app-directories');
const createApp = require('../create');
const sinon = require('sinon');
const { assert } = require('chai');



describe('server apps register -- integration', () => {
  let register;
  let sandbox;
  let createAppSpy;
  let getAppDirectoriesSpy;
  let serverRoots;
  let logger;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    createAppSpy = sandbox.spy(createApp);
    getAppDirectoriesSpy = sandbox.spy(getAppDirectories);
    logger = createLogger(sandbox);
    serverRoots = [path.resolve(__dirname, '../../../tests/scenarios/server/multiple-apps')];
    register = R.curry(require('./create-apps'))(path, createAppSpy, getAppDirectoriesSpy);
    register(serverRoots, logger);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when register is called', () => {
    it(`should call getAppDirectories with ${serverRoots}`, () => {
      assert.equal(getAppDirectoriesSpy.args[0][0], serverRoots, 'get-app-configs was not called with the expected apps directory');
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
