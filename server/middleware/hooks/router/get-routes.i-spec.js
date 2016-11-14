const getRoutes = require('./get-routes');
const path = require('path');
const { assert } = require('chai');

describe('server middleware hooks router get-routes -- integration', () => {
  context('when passed the path to the server root', () => {
    const EXPECTED_ROUTES_LEN = 1;
    let routes;

    before(() => {
      routes = getRoutes(require, path, '../../../');
    });

    it(`should return array of routes with length ${EXPECTED_ROUTES_LEN}`, () => {
      assert.equal(routes.length, EXPECTED_ROUTES_LEN, `The get-routes did not return an array with length ${EXPECTED_ROUTES_LEN}`);
    });

    it('should return array with items that have a verb, uriTemplate, and endpoint defined', () => {
      routes.forEach((route) => {
        assert.isString(route.verb, 'The routes verb was not a string');
        assert.isString(route.uriTemplate, 'The routes uriTemplate was not a string');
        assert.equal(typeof route.endpoint, 'function', 'The routes endpoint was not a function');
      });
    });
  });
});
