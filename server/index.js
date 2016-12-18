const R = require('ramda');
const Koa = require('koa');
const mounts = require('./mounts');

const server = R.curry(require('./create'))(Koa, mounts);

module.exports = server;
