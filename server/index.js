const R = require('ramda');
const Koa = require('koa');
const apps = require('./apps');

const server = R.curry(require('./create'))(Koa, apps);

module.exports = server;
