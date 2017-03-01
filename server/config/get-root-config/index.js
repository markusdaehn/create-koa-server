const { curry } = require('ramda');
const path = require('path');
const getConfig = require('get-conf');
const nullableLogger = require('../../utils/nullable-logger');
const normalize = require('../normalize-root-config');

module.exports = curry(require('./get-root-config'))(nullableLogger, path.join, Object.freeze, getConfig, normalize);
