const R = require('ramda');
const plugins = require('./plugins');
const hooks = require('./hooks');
const register = R.curry(require('./register'))(plugins, hooks);

module.exports = {
  plugins,
  hooks,
  register
}
