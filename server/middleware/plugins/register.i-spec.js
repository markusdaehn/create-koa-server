const R = require('ramda');
const fs = require('fs');
const path = require('path');
const getDirectories = R.curry(require('./get-directories'))(fs, path);
const toCamelCase = require('./to-camel-case');
const getPlugins = R.curry(require('./get-plugins'))(getDirectories, toCamelCase);

describe('middleware plugins register -- integration', () => {
  context('when calling plugins register', () => {
    it('should register all plugins', () => {
      //let plugins = getPlugins(server, logger);
    });
  });
});
