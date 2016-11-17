const createServer = require('./create.js');
const sinon = require('sinon');
const { assert } = require('chai');

describe('server', () => {
  context('when create is called', () => {
    let sandbox;
    let middleware;
    let logger;
    let app;
    let koa;
    let port;
    let ip;
    let root;
    let server;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      middleware = createMiddleware(sandbox);
      logger = createLogger(sandbox);
      httpServer = createHttpServer(sandbox);
      app = createApp(sandbox, httpServer);
      koa = function() { return app };
      port = 8080;
      ip = '156.129.55.01';
      root = __dirname;

      config = {
        server: {
          ip,
          port,
          root
        }
      };

    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should define the server root path', () => {
      server = createServer(koa, logger, config, middleware);

      assert.isDefined(server.root, 'The server root path was not set');
    });

  });
});

function createMiddleware(sandbox) {
  return {
    hooks: {
      errorHandler: {
        register: sandbox.stub()
      },
      router: {
        register: sandbox.stub()
      }
    },
    plugins: {
      register: sandbox.stub()
    }
  };
}
function createApp(sandbox, httpServer) {
  return {
    use: sandbox.stub(),
    emit: sandbox.stub(),
    env: 'test',
    listen: sandbox.stub().returns(httpServer)
  };
}

function createHttpServer(sandbox) {
  return {
    close: sandbox.stub()
  };
}

function createLogger(sandbox) {
  return {
    error: sandbox.stub(),
    debug: sandbox.stub(),
    info: sandbox.stub(),
    warn: sandbox.stub()
  }
}
