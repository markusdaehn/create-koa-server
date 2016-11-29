
const R = require('ramda');
const fs = require('fs');
const path = require('path');
const toCamelCase = require('./to-camel-case');
const getMiddlewares = require('./get-middlewares');
const constants = require('./constants');
const sinon = require('sinon');
const { assert } = require('chai');

describe('middleware helpers get-middlewares -- integration', () => {
  const expected_plugin_middleware = [
    '0_test1Plugin',
    '1_test2Plugin'
  ];
  const expected_router_hooks_middleware = [
    '0_test1Hook',
    '1_test2Hook'
  ];
  let sandbox;
  let server;
  let logger;
  let getDirectories;

  beforeEach(() =>{
    sandbox = sinon.sandbox.create();
    server = {root: path.resolve(__dirname, '../..')};
    logger = createLogger(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when called with plugin folder', () => {
    beforeEach(() =>{
      getDirectories = R.curry(require('./get-directories'))(fs, path, constants.PLUGINS_FOLDER);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return the correct plugins', () => {
      let plugins = getMiddlewares(getDirectories, toCamelCase, server, logger);
      Object.keys(plugins).forEach((plugin) => {
        assert.isTrue(expected_plugin_middleware.includes(plugin));
      });
    });
    context('when called with hooks router folder', () => {
      beforeEach(() =>{
        getDirectories = R.curry(require('./get-directories'))(fs, path, constants.HOOKS_ROUTER_FOLDER);
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should return the correct plugins', () => {
        let plugins = getMiddlewares(getDirectories, toCamelCase, server, logger);
        Object.keys(plugins).forEach((plugin) => {
          assert.isTrue(expected_router_hooks_middleware.includes(plugin));
        });
      });
    });
  });
});


function createLogger(sandbox) {
  return {
    info: sandbox.spy(),
    debug: sandbox.spy(),
    error: sandbox.spy(),
    trace: sandbox.spy()
  };
}
