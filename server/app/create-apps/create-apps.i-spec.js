const { assert } = require('chai');
const createApps = require('./index');
const path = require('path');

describe('server.app.createApps -- integration', () => {
  let logger;
  let apps;

  beforeEach(() => {
    logger = createLogger();
    config = createConfig();
    apps = createApps(config, logger);
  });

  describe('when called with a valid config', () => {
    it(`should call getAppDirectories with`, () => {
      console.log(apps);
    });
  });
});

function createConfig() {
  return {
    '/api': {
      '__appRoots__': [path.resolve(__dirname, '../../../tests/scenarios/server/multiple-apps')],
      '__mountPrefix__': '/api'
    }
  };
}

function createLogger(sandbox) {
  return {
    error: () => {},
    debug: () => {},
    trace: () => {},
    info: () => {}
  }
}
