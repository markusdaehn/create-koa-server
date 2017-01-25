const R = require('ramda');
const joinPath = require('path').join;
const getConfig = require('get-conf');
const deepMerge = require('deep-extend');
const extend = require('./extend');

module.exports = R.curry(extend)(joinPath, getConfig, deepMerge);
