const errorHandler = require('./errorHandler');
const router = require('./router');
const hooks = {
  errorHandler,
  router
};

module.exports = hooks;
