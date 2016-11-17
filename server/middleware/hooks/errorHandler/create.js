module.exports = function createErrorHandler(server, logger) {
  return function * (next) {
    try {
      yield next;
    } catch (error) {
      this.status = error.status || 500;
      this.body = error.message;

      if (server.env != 'production') {
        this.body += error.stack;
      }

      logger.error({status: this.status, body: this.body});
      server.emit('error', error, this);
    }
  }
}
