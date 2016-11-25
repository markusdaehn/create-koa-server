const R = require('ramda');
const route = R.curry(require('./create'))(console.log.bind(console));

module.exports = route;
