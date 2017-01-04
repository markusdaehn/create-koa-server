
const createServer = require('./create.js');
const sinon = require('sinon');
const { assert } = require('chai');
const path = require('path');
const nullableLogger = require('./utils/nullable-logger');

describe('server create -- unit', () => {
  context('when create is called', () => {
    let sandbox;
    let apps;
    let appsRegistry;
    let logger;
    let app;
    let Koa;
    let port;
    let ip;
    let root;
    let server;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      logger = createLogger(sandbox);
      httpServer = createHttpServer(sandbox);
      apps = [createApp(sandbox, httpServer)];
      app = createApp(sandbox, httpServer);
      appsRegistry = createAppsRegistry(sandbox, apps);
      Koa =  sinon.spy(function() { return app });
      port = 8080;
      ip = '156.129.55.01';
      root = path.resolve(__dirname, '../tests/scenarios/basic-server');

      config = {
        server: {
          ip,
          port,
          root
        }
      };

      server = createServer(Koa, appsRegistry, nullableLogger, {config, logger});

    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should define the server root path', () => {

    });
  });
});

function createAppsRegistry(sandbox, apps) {
  return {
    register: sandbox.spy(() => {
      return apps;
    })
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
    warn: sandbox.stub(),
    trace: sandbox.stub()
  }
}
