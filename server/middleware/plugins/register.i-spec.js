const R = require('ramda');
const fs = require('fs');
const path = require('path');
const constants = require('../../constants');
const getDirectories = R.curry(require('../../utils/get-directories'))(fs, path);
const toCamelCase = require('../../utils/to-camel-case');
const getPlugins = R.curry(require('../get-middlewares'))(require, getDirectories, toCamelCase);
const sinon = require('sinon');
const { assert } = require('chai');

describe('server middleware plugins register -- integration', () => {
  let sandbox;
  let logger;
  let app;
  let register;
  let getPluginsSpy;


  context('when calling plugins register', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      logger = createLogger(sandbox);
      app = {
        use: sandbox.stub(),
        root: path.resolve(__dirname, '../../../tests/scenarios/basic-server')
      };
      getPluginsSpy = sandbox.spy(getPlugins);
      register = R.curry(require('./register'))(path, getPluginsSpy, constants.PLUGINS_FOLDER);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should register all plugins', () => {
      register(app, logger);
      assert.isTrue(getPluginsSpy.calledWith(path.join(app.root, constants.PLUGINS_FOLDER)), 'Did not call get plugins with the correct params');
      assert.isTrue(app.use.calledTwice, 'The app should have registered two plugins')
    });
  });
});

function createLogger(sandbox) {
  return {
    info: sandbox.spy(),
    debug: sandbox.spy(),
    trace: sandbox.spy()
  };
}
