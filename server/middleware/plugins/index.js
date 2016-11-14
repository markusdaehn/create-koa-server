const R = require('ramda');
const fs = require('fs');
const path = require('path');
const toCamelCase = require('./to-camel-case');
const getDirectories = R.curry(require('./get-directories'))(fs, path);
const getPlugins = require('get-plugins');


module.exports = getPlugins(getDirectories, toCamelCase, __dirname);
