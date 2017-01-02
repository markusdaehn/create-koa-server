const path = require('path');
const sinon = require('sinon');
describe('server -- integration', () => {
  let sandbox;
  let config;
  let logger;
  let server;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    logger = createLogger(sandbox);
    config = createConfig(sandbox);
  });

  context('when calling the server.create method', () => {
    it('should create server', () => {
      server = require('./')({config, logger});
    });
  });
});

function createConfig() {
  let port = 8080;
  let ip = '156.129.55.01';
  let root = path.resolve(__dirname, '../tests/scenarios/basic-server');

  return {
    server: {
      ip,
      port,
      root
    }
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
