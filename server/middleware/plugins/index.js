const fs = require('fs');
const path = require('path');
const getPlugins = require('get-plugins');


module.exports = getPlugins(fs, path, __dirname);
