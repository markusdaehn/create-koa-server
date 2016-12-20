const constants = require('../../../helpers/constants');
const getRoutes = require('./get-routes');
const path = require('path');
const glob = require('glob');
const sinon = require('sinon');
const { assert } = require('chai');

describe('server middleware hooks router get-routes -- integration', () => {
  const EXPECTED_ROUTES_LEN = 1;
  const ROOT_NOSLASH = path.resolve(__dirname, '../../../../tests/scenarios/basic-server');
  const ROOT_SLASH = `${ROOT_NOSLASH}/`;
  const JOINED_PATH = `${ROOT_SLASH}routes`;
  const GLOB_PATH = `.${constants.ROUTES_FOLDER}/**/index.js`;
  const EXPECTED_ROUTE_PATH = `${ROOT_SLASH}routes/test-route/get/index.js`;

  let sandbox;
  let requireSpy;
  let routes;
  let routesResult;
  let logger;
  let config;


  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    requireSpy = sinon.spy(require);
    logger = createLogger(sandbox);
    config = {app: {name: 'test-app'}};
  });

  afterEach(() => {
    sandbox.restore();
  });

  [ROOT_SLASH, ROOT_NOSLASH].forEach((root) => {
    context(`when passed the following root '${root}'`, () => {
      it(`should call require with ${EXPECTED_ROUTE_PATH}`, () => {
        routesResult = getRoutes(requireSpy, glob, path, constants.ROUTES_FOLDER, {root, config}, logger);
        assert.equal(requireSpy.args[0][0], EXPECTED_ROUTE_PATH, 'Did not call require with the correct route path');
      });

      it(`should return array of routes with length ${EXPECTED_ROUTES_LEN}`, () => {
        routesResult = getRoutes(require, glob, path, constants.ROUTES_FOLDER, {root, config}, logger);
        assert.equal(routesResult.length, EXPECTED_ROUTES_LEN, `The get-routes did not return an array with length ${EXPECTED_ROUTES_LEN}`);
      });

      it('should return an array of items with verb, uriTemplate, and endpoint properties defined', () => {
        routesResult = getRoutes(require, glob, path, constants.ROUTES_FOLDER, {root, config}, logger);
        routesResult.forEach((route) => {
          assert.isString(route.verb, 'The routes verb was not a string');
          assert.isString(route.uriTemplate, 'The routes uriTemplate was not a string');
          assert.equal(typeof route.endpoint, 'function', 'The routes endpoint was not a function');
        });
      });
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
    info: sandbox.stub(),
    trace: sandbox.stub()
  };
}
