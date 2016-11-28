const errorHandler = require('./error-handler');
const router = require('./router');
const hooks = {
  errorHandler,
  router
};

module.exports = hooks;
