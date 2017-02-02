const R = require('ramda');
const path = require('path');
const extendConfig = require('../../config/extend');
const create = require('../create');
const getAppDirectories = require('../get-app-directories');

module.exports = R.curry(require('./create-apps'))(path, create, getAppDirectories);
