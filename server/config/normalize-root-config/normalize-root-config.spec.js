const normalize = require('./index');
const { assert } = require('chai');

describe('server.config.normalize-root-config', () => {
  describe('when root config has the server and root app configs together and in there own property', () => {
    it('should normalize to having all server configs in server property and all app configs in app properties', () => {
      const config = createConfig();
      const expected = createExpectedConfig();
      const normalized = normalize(config);
      assert.deepEqual(normalized, expected)
    });
  });
});


function createConfig() {
  return {
    server: {
      ip: '1.2.3.4',
      appName: 'single-app-config',
    },
    port: 1234,
    env: 'development',
    logging: {
      path: '/some/log/path',
      level: 'error'
    },
    '/': {
      a: 'a'
    },
    '/app': {
      'c': 'c',
      'd': 'd'
    },
    b: 'b',
    c: 'c'
  }
}

function createExpectedConfig(){
  return {
    server: {
      ip: '1.2.3.4',
      port: 1234,
      env: 'development',
      logging: {
        path: '/some/log/path',
        level: 'error'
      },
      appName: 'single-app-config'
    },
    '/': {
      a: 'a',
      b: 'b',
      c: 'c'
    },
    '/app': {
      'c': 'c',
      'd': 'd'
    }
  }
}
