const { assert } = require('chai');
const path = require('path');

describe('server config -- integration', () => {
  context('when calling index', () => {
    const serverRoot = path.resolve(__dirname, '../../tests/scenarios/basic-server');
    let config;
    let logger;

    beforeEach(() => {
      logger = createLogger();
      config = require('./index').create(logger, process.env, serverRoot);
    });

    it(`should return an object with a property server.env equal to '${process.env.NODE_ENV}'`, () => {
      assert.equal(config.env, process.env.NODE_ENV, 'The config did not have the correct environment');
    });
  });
});

function createLogger() {
  return {
    error: () => {},
    warn: () => {},
    info: () => {},
    trace: () => {},
  };
}
