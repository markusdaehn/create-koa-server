
const R = require('ramda');
const fs = require('fs');
const path = require('path');
const toCamelCase = require('./to-camel-case');
const getPlugins = require('./get-plugins');
const sinon = require('sinon');
const { assert } = require('chai');

describe('middleware plugins get-plugins -- integration', () => {
  const expected_plugins = [
    '0_test1Plugin',
    '1_test2Plugin'
  ]
  let sandbox;
  let server;
  let logger;
  let getDirectories;

  beforeEach(() =>{
    sandbox = sinon.sandbox.create();
    server = {root: path.resolve(__dirname, '../..')};
    logger = createLogger(sandbox);
    getDirectories = R.curry(require('./get-directories'))(fs, path);
  })
  context('when called', () => {
    it('should return the correct plugins', () => {

      let plugins = getPlugins(getDirectories, toCamelCase, server, logger);
      Object.keys(plugins).forEach((plugin) => {
        assert.isTrue(expected_plugins.includes(plugin));
      });
    });
  });
});


function createLogger(sandbox) {
  return {
    info: sandbox.spy(),
    debug: sandbox.spy(),
    error: sandbox.spy()
  };
}
