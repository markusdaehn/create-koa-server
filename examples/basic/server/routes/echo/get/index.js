const R = require('ramda');
const echoService = require('../../../../application/services/echo-service');
const route = R.curry(require('./create'))(echoService);

module.exports = route;
