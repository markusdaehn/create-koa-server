module.exports = function handleError(context, error, server, logger) {
  //@NOTE: This is a niave example to show how to override the default global error handler. 
  context.status = 500;
  context.body = 'Unhandled Error';
}
