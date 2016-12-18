const R = require('ramda');
const fs = require('fs');
const path = require('path');
const constants = require('../../../helpers/constants');
const toCamelCase = require('../../../helpers/to-camel-case');
const getDirectories = R.curry(require('../../../helpers/get-directories'))(fs, path);
const getHooks = R.curry(require('../../get-middlewares'))(require, getDirectories, toCamelCase);
const handleError = require('./handle-error');
const sinon = require('sinon');
const { assert } = require('chai');

describe('server middleware hooks error-handler register -- integration', () => {
  let sandbox;
  let logger;
  let app;
  let register;
  let getHandler;
  let getHandlerSpy;
  let createErrorHandler;


  context('when calling hooks error-handler register', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      logger = createLogger(sandbox);
      app = {
        use: sandbox.stub(),
        root: path.resolve(__dirname, '../../../../tests/scenarios/basic-server')
      };
      getHandler = R.curry(require('./get-handler'))(Object.keys, getHooks, handleError);
      getHandlerSpy = sandbox.spy(getHandler);
      createErrorHandler = R.curry(require('./create'))(path, getHandlerSpy, constants.HOOKS_ERROR_HANDLER_FOLDER);
      register = R.curry(require('./register'))(createErrorHandler);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should register all plugins', () => {
      register(app, logger);

      assert.isTrue(getHandlerSpy.calledWith(path.join(app.root, constants.HOOKS_ERROR_HANDLER_FOLDER), logger), 'Did not call getHandler with the correct params');
      assert.isTrue(app.use.calledOnce, 'The app should have registered the error handler')
    });
  });
});

function createLogger(sandbox) {
  return {
    info: function(){},
    debug: function(){},
    trace: function(){}
  };
}
