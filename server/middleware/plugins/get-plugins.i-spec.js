
const R = require('ramda');
const fs = require('fs');
const path = require('path');
const getDirectories = R.curry(require('./get-directories'))(fs, path, __dirname);
const toCamelCase = require('./to-camel-case');
const getPlugins = require('./get-plugins');
const sinon = require('sinon');

describe.only('middleware plugins get-plugins -- integration', () => {
  let sandbox;
  let server;
  let logger;

  beforeEach(() =>{
    sandbox = sinon.sandbox.create();
    server = {};
    logger = createLogger(sandbox);
  })
  context('when called', () => {
    it('should return the correct plugins', () => {
      let plugins = getPlugins(getDirectories, toCamelCase, server, logger);
      console.log('###>>>', plugins);
    });
  });
});


function createLogger(sandbox) {
  return {
    info: sandbox.spy((a)=> {console.log(a)}),
    debug: sandbox.spy((a)=> {console.log(a)})
  };
}
