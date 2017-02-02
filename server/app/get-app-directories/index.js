const { concat, curry } = require('ramda');
const path = require('path');
const fs = require('fs');
const getDirectories = curry(require('../../utils/get-directories'))(fs, path);

module.exports = curry(require('./get-app-directories'))(path.join, concat, getDirectories);
