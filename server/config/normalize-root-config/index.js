const { curry } = require('ramda');
const { SERVER_CONFIG_KEYS } = require('../constants');

module.exports = curry(require('./normalize-root-config'))(Object.freeze, Object.keys, SERVER_CONFIG_KEYS);
