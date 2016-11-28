const R = require('ramda');
const fs = require('fs');
const path = require('path');
const constants = require('../helpers/constants');
const getDirectories = R.curry(require('../helpers/get-directories'))(fs, path, constants.PLUGINS_FOLDER);
const toCamelCase = require('../helpers/to-camel-case');
const getPlugins = R.curry(require('../helpers/get-middlewares'))(getDirectories, toCamelCase);

describe('middleware plugins register -- integration', () => {
  context('when calling plugins register', () => {
    it('should register all plugins', () => {
      //let plugins = getPlugins(server, logger);
    });
  });
});
