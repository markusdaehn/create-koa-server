const { assert } = require('chai');
const config = require('./index');

describe('server config -- integration', () => {
  context('when calling index', () => {
    it(`should return an object with a property server.env equal to '${process.env.NODE_ENV}'`, () => {
      assert.equal(config.env, process.env.NODE_ENV, 'The config did not have the correct environment');
    });
  });
});
