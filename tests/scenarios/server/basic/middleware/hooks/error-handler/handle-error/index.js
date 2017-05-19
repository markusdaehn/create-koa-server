module.exports = function handleError(context, error, server, logger) {
  logger.info(
    { func_name: 'server.middleware.hooks.error-handler.handle-error' },
    'Naive error handler'
  )
  //@NOTE: This is a naive example to show how to override the default global error handler.
  context.status = 500
  context.body = 'Unhandled Error'
}
