const routerMiddleware = require('./');
const sinon = require('sinon');
const { assert } = require('chai');
const path = require('path');

describe.only('server middleware hooks router -- integration', () => {
  let sandbox;
  let server;
  let logger;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = createServer(sandbox);
    logger = createLogger(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when calling register with the server and logger', () => {
    it('should call server with routes', () => {
      routerMiddleware.register(server, logger);

      assert.equal(typeof server.use.args[1][0], 'function', 'The first call to server.use was not a fucntion');
      assert.equal(server.use.args[1][0].name, 'allowedMethods', 'The second call to server.use was not the allowMethods funxtion');
    });
  });
});

function createServer(sandbox) {
  return {
    use: sandbox.stub(),
    root: path.resolve(__dirname, '../../..')
  };
}

function createLogger(sandbox) {
  return {
    error: sandbox.stub(),
    debug: sandbox.stub(),
    info: sandbox.stub()
  };
}
