const { assert } = require('chai');

describe('server config --integration', () => {
  context('when importing the config', () => {
    it('should return the correct config.server.env', () => {
      const config = require('./');

      assert.equal(config.server.env, process.env.NODE_ENV, `The server.env (${config.server.env}) was not set to the correct environement ${process.env.NODE_ENV}`);
    });
  });
});
