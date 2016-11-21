const server = require('./server');


//@NOTE: Ensure to only call start if this is the entry point
if(!module.parent) {
  server.start(beforeStart);
}

function beforeStart (app, config, logger) {
  // @NOTE: Write code you want to execute before server starts
  return Promise.resolve();
}
