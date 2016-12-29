const R = require('ramda');
const fs = require('fs');
const path = require('path');
const constants = require('../../../constants');
const toCamelCase = require('../../../utils/to-camel-case');
const getDirectories = R.curry(require('../../../utils/get-directories'))(fs, path);
const getHooks = R.curry(require('../../get-middlewares'))(require, getDirectories, toCamelCase);
const handleError = require('./handle-error');
const getHandler = R.curry(require('./get-handler'))(Object.keys, getHooks, handleError);
const createErrorHandler = R.curry(require('./create'))(path, getHandler, constants.HOOKS_ERROR_HANDLER_FOLDER);

module.exports = {
  register: R.curry(require('./register'))(createErrorHandler)
};
