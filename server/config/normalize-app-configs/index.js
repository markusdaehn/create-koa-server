const { curry } = require('ramda');
const extend = require('deepmerge2');
const { SERVER_CONFIG_KEYS } = require('../constants');


module.exports = curry(require('./normalize-app-configs'))(Object.freeze, Object.keys, extend, SERVER_CONFIG_KEYS);
