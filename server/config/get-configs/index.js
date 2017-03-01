const { curry } = require('ramda');
const extend = require('deepmerge2');
const getRootConfig = require('../get-root-config');
const getAppConfigs = require('../get-app-configs');

module.exports = curry(require('./get-configs'))(getRootConfig, getAppConfigs, extend, Object.freeze);
