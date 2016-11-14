const R = require('ramda');
const bodyParser = require('koa-bodyparser');

module.exports = R.curry(require('.register'));
