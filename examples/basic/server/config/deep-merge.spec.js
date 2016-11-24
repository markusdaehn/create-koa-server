const sinon = require('sinon');
const { assert } = require('chai');
const R = require('ramda');
const deepMerge = R.curry(require('./deep-merge'))(R.curry, R.is, R.mergeWith);

const DEFAULT_FILE_PATH = '/path/to/log.txt';

describe('server config deep-merge -- unit', () => {
  let defaultConfig;
  let envConfig;
  let mergedConfig;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    defaultConfig = createDefaultConfig(sandbox);
    envConfig = createEnvConfig(sandbox);

    mergedConfig = deepMerge(defaultConfig, envConfig);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when calling deep-merge with a source object and a destination object with property objects with the same name', () => {
    it('should recursively replace the destination object properties by the same name with the source object', () => {
      assert.equal(mergedConfig.app.logging.level, envConfig.app.logging.level, 'The merged config app logging level was not set to the environment.');
    });
    it('should recursively add properties from the source  object that are not in the destination object', () => {
      assert.isBoolean(mergedConfig.app.logging.enabled, 'The merged config missing enabled property from the source object');
    });
    it('should not remove any properties in the destination object if it is not in the source object', () => {
      assert.equal(mergedConfig.app.logging.path, DEFAULT_FILE_PATH, 'The file path was not ');
    });
  });
});

function createDefaultConfig(sandbox) {
  return  {
    app: {
      logging: {
        level: 'error',
        path: DEFAULT_FILE_PATH
      }
    }
  };
}

function createEnvConfig(sandbox) {
  return {
    app: {
      logging: {
        level: 'debug',
        enabled: false
      }
    }
  };
}
