const { assert } = require('chai');
const path = require('path');

describe('server config -- integration', () => {
  context('when calling index', () => {
    const root = path.resolve(__dirname, '../../tests/scenarios/basic-server');
    const config = require('./index')(process.env, root);

    it(`should return an object with a property server.env equal to '${process.env.NODE_ENV}'`, () => {
      console.log('###config.server', config.server);

      assert.equal(config.server.env, process.env.NODE_ENV, 'The config did not have the correct environment');
    });
  });
});
