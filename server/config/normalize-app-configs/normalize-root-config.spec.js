const normalize = require('./index');
const { assert } = require('chai');

describe('server.config.normalize-app-configs', () => {
  describe('when app config has the server and root app configs together and in there own property', () => {
    it('should normalize to remove server configs add add all configs not in app config root app config and add all app properties', () => {
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
    logging: {
      path: '/some/log/path',
      level: 'error'
    },
    '/': {
      '/': {
        e: 'e',
      },
      '/app': {
        f: 'f'
      },
      '/ui': {
        g: 'g'
      },
      a: 'a',
      env: 'development'
    },
    '/app': {
      c: 'c',
      d: 'd'
    },
    b: 'b',
    c: 'c',
    '/ui': {
      h: 'h'
    }
  }
}

function createExpectedConfig(){
  return {
    '/': {
      a: 'a',
      b: 'b',
      c: 'c',
      e: 'e'
    },
    '/app': {
      c: 'c',
      d: 'd',
      f: 'f'
    },
    '/ui': {
      g: 'g',
      h: 'h'
    }
  }
}
