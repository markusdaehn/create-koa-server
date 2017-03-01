const { curry } = require('ramda');
const path = require('path');
const getAppDirectories = require('../../app/get-app-directories');
const getConfig = require('get-conf');
const nullableLogger = require('../../utils/nullable-logger');
const normalize = require('../normalize-app-configs');

module.exports = curry(require('./get-app-configs'))(nullableLogger, path.join, Object.freeze, getAppDirectories, getConfig, normalize);
