const sinon = require('sinon');
const path = require('path');
const { assert } = require('chai');

describe('server.app.create', () => {
  const create = require('./index');
  const sandbox = sinon.sandbox.create();
  const logger = createLogger();

  let server, config, app;

  beforeEach(() => {
    server = createServer(sandbox);
    config = createConfig();
    app = create(config, logger)

  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when create is called', () => {
    it('should return an app with the config property set to the config passed to the create function', () => {
      assert.deepEqual(app.config, config, 'The config was not correct');
    });

    it('should return an app with a roots property set to the config.__appRoots__', () => {
      assert.deepEqual(app.roots, config.__appRoots__, 'The app.roots was incorrect');
    });

    it('should return an app with a mountPrefix property set to the config.__mountPrefix__', () => {
      assert.equal(app.mountPrefix, config.__mountPrefix__, 'The app.mountPrefix was incorrect');
    });

    it('should return an app with a emit function', () => {
      assert.isFunction(app.emit, 'The app.emit was not a function');
    });

    it('should return an app with a use function', () => {
      assert.isFunction(app.use, 'The app.use was not a function');
    });

    it('should return an app with a register function', () => {
      assert.isFunction(app.register, 'The app.register was not a function');
    });

    it(`should return an app with a instance property with env set to ${process.env.NODE_ENV}`, () => {
      assert.equal(app.instance.env, process.env.NODE_ENV);
    })
  });
});


function createServer(sandbox) {
  return {
    use: sandbox.stub()
  }
}

function createConfig() {
  return {
    '__appRoots__': [path.resolve(__dirname, '../../../tests/scenarios/server/multiple-apps')],
    '__mountPrefix__': '/api'
  };
}

function createLogger() {
  return {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    trace: () => {}
  };
}
