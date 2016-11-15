const fs = require('fs');
const path = require('path');
const R = require('ramda');
const create = require('./create');
const envConfig = require('./environment');

module.exports = create(fs, path, process.env, R.merge, __dirname, envConfig)
