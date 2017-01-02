const R = require('ramda');
const Koa = require('koa');
const app = require('./app');

const createServer = R.curry(require('./create'))(Koa, app);

module.exports = createServer;
