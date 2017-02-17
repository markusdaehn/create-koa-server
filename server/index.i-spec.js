const path = require('path');
const sinon = require('sinon');
describe('server -- integration', () => {
  let sandbox;
  let config;
  let logger;
  let server;
  let serverRoot;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    logger = createLogger(sandbox);
    config = createFakeConfig(sandbox);
    serverRoot = path.resolve(__dirname, '../tests/scenarios/server/basic');
  });

  context('when calling the server.create method', () => {
    it('should create server', () => {
      server = require('./')({config, logger, serverRoot});
    });
  });
});

function createFakeConfig() {
  let port = 8080;
  let ip = '156.129.55.01';

  return {
    ip,
    port
  };
}
function createLogger(sandbox) {
  return {
    debug: sandbox.stub(),
    error: sandbox.stub(),
    warn: sandbox.stub(),
    trace: sandbox.stub(),
    info: sandbox.stub()
  };
}
