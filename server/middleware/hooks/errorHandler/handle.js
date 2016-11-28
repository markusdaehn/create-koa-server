module.exports = function handleError(context, error, server, logger) {
  logger.info('server.middleware.hooks.error-handler.handle > : handling error using default handler')

  context.status = error.status || 500;
  context.body = error.message;

  if (server.env != 'production') {
    context.body += error.stack;
  }

  logger.error({status: context.status, body: context.body});
  server.emit('error', error, context);

  logger.info('server.middleware.hooks.error-handler.handle <');
}
