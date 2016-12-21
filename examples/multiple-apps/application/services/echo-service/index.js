const R = require('ramda');
const createMetaRepo = require('../../../infrustructure/database/meta-repository');

module.exports = R.curry(require('./create'))(R.curry, createMetaRepo);
