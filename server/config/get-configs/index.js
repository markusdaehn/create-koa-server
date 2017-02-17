const { curry } = require('ramda');
const path = require('path');
const getAppDirectories = require('../../app/get-app-directories');
const getConfig = require('get-conf');

module.exports = curry(require('./get-configs'))(path.join, Object.freeze, getAppDirectories, getConfig);
