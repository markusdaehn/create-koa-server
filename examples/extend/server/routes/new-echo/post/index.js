const R = require('ramda');
const route = R.curry(require('./create'))();

module.exports = route;
