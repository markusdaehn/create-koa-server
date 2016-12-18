const routerMiddleware = require('./');
const sinon = require('sinon');
const { assert } = require('chai');
const path = require('path');

describe('server middleware hooks router -- integration', () => {
  let sandbox;
  let app;
  let logger;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    app = createApp(sandbox);
    logger = createLogger(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when calling register with the app and logger', () => {
    it('should call app with routes', () => {
      routerMiddleware.register(app, logger);

      assert.equal(typeof app.use.args[1][0], 'function', 'The first call to app.use was not a fucntion');
      assert.equal(app.use.args[1][0].name, 'allowedMethods', 'The second call to app.use was not the allowMethods funxtion');
    });
  });
});

function createApp(sandbox) {
  return {
    use: sandbox.stub(),
    root: path.resolve(__dirname, '../../../../tests/scenarios/basic-server'),
    config: { app: { name: 'test-app' } }
  };
}

function createLogger(sandbox) {
  return {
    error: sandbox.stub(),
    debug: sandbox.stub(),
    info: sandbox.stub(),
    trace: sandbox.stub()
  };
}
