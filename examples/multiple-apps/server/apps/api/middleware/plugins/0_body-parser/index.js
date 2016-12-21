const R = require('ramda');
const bodyParser = require('koa-bodyparser');

module.exports = {
  register: R.curry(require('./register'))(bodyParser)
}
