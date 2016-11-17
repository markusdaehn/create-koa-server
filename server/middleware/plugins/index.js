const R = require('ramda');
const fs = require('fs');
const path = require('path');
const toCamelCase = require('./to-camel-case');
const getDirectories = R.curry(require('./get-directories'))(fs, path);
const getPlugins = R.curry(require('./get-plugins'))(getDirectories, toCamelCase);
const register = R.curry(require('./register'))(getPlugins);

module.exports = { register };
