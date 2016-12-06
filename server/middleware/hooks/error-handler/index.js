const R = require('ramda');
const fs = require('fs');
const path = require('path');
const constants = require('../../helpers/constants');
const toCamelCase = require('../../helpers/to-camel-case');
const getDirectories = R.curry(require('../../helpers/get-directories'))(fs, path, constants.HOOKS_ERROR_HANDLER_FOLDER);
const getHooks = R.curry(require('../../helpers/get-middlewares'))(getDirectories, toCamelCase);
const handleError = require('./handle-error');
const getHandler = R.curry(require('./get-handler'))(Object.keys, getHooks, handleError);
const createErrorHandler = R.curry(require('./create'))(getHandler);

module.exports = {
  register: R.curry(require('./register'))(createErrorHandler)
};
