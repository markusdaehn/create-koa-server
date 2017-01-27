
const createServer = require('./create.js');
const sinon = require('sinon');
const { assert } = require('chai');
const path = require('path');
const nullableLogger = require('./utils/nullable-logger');
const extendConfig = require('./config/extend');

describe('server create -- unit', () => {
  context('when create is called', () => {
    let sandbox;
    let appsRegistry;
    let apps;
    let logger;
    let app;
    let Koa;
    let port;
    let ip;
    let root;
    let server;
    let httpServer;
    let expectedConfig = createExpectedConfig();

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      httpServer = createHttpServer(sandbox);
      apps = [createApp(sandbox, httpServer)];
      appsRegistry = createAppsRegistry(sandbox, apps);
      logger = createLogger(sandbox);
      app = createApp(sandbox, httpServer);
      Koa =  sinon.spy(function() { return app });
      config = createFakeConfig();
      server = createServer(Koa, appsRegistry, path.join, nullableLogger, extendConfig, {config, serverRoot: config.root, logger, envVars: process.env});

    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should define the server root path', () => {
      assert.isArray(server.roots, 'The server root path was not set');
    });

    it('should call the koa constructor once', () => {
      assert.isTrue(Koa.calledOnce, 'The Koa constructor was not called once');
    });

    it('should set the server.config to the config passed into the create method', () => {
      assert.deepEqual(server.config, expectedConfig, 'The server config did not equal to the expected config');
    });

    it('should call apps register once', () => {
      server.start();
      assert.isTrue(appsRegistry.createApps.calledOnce, 'The apps.register was not call once');
    });

  });
});

function createAppsRegistry(sandbox, apps) {
  return {
    createApps: sandbox.spy(() => {
      return apps;
    })
  };
}
function createApp(sandbox, httpServer) {
  return {
    use: sandbox.stub(),
    emit: sandbox.stub(),
    env: 'test',
    listen: sandbox.stub().returns(httpServer),
    register: sandbox.stub()
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
function createExpectedConfig() {
  let expected = createFakeConfig();

  expected.ip = undefined;
  expected.appName = 'basic-app-test';
  expected.env = 'test';
  expected.logging = {
    level: 'error',
    path: path.resolve(__dirname, '../tests/scenarios/server/basic/logs/log.txt')
  };

  return expected;
}
function createFakeConfig() {
  let port = 8080;
  let ip = '156.129.55.01';
  let root = path.resolve(__dirname, '../tests/scenarios/server/basic');

  return {
    ip,
    port,
    root
  };
}
