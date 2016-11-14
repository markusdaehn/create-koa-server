const getRoutes = require('./get-routes');
const path = require('path');
const sinon = require('sinon');
const { assert } = require('chai');

describe('server middleware hooks router get-routes -- unit', () => {
  const PATH_NOSLASH = '../..';
  const PATH_SLASH = `${PATH_NOSLASH}/`;
  const JOINED_PATH = `${PATH_SLASH}routes`;
  let sandbox;
  let get;
  let routes;
  let routesResult;


  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    get = sinon.stub();
    sandbox.spy(path, 'join');
    routes = [{ verb: 'get', uriTemplate: '/entry', endpoint: function*(){}}];
  });

  afterEach(() => {
    sandbox.restore();
  });

  [PATH_SLASH, PATH_NOSLASH].forEach((root) => {
    context(`when passed the following root '${root}'`, () => {
      beforeEach(() => {
        routesResult = getRoutes(get, path, root);
      });

      it(`should pass the root path and 'routes' to path.join`, () => {
        assert.isTrue(path.join.calledWith(root, 'routes'), 'Did not call path.join with the correct arguments');
      });

      it(`should pass a '${JOINED_PATH}' into the get method`, () => {
        assert.equal(get.args[0][0], JOINED_PATH, 'The routes get was not caleld with the correct path');
      });
    });
  });


});
