const { assert } = require('chai');
const getEnvVars = require('./get-env-vars');
const path = require('path');

describe('server config get-env-vars -- integration', () => {
  const DEFAULT_SERVER_ROOT = path.resolve(__dirname, '../');
  const EXPECTED_DEFAULT_CONFIG = {
    SERVER_ROOT: DEFAULT_SERVER_ROOT,
    IP: undefined,
    PORT: 8080,
    NODE_ENV: undefined,
    LOG_PATH: `${DEFAULT_SERVER_ROOT}/logs/log.txt`
  };

  const EXPECTED_ENV_CONFIG = {
    SERVER_ROOT: 'C://app/server',
    IP: '165.200.10.1',
    PORT: 80,
    NODE_ENV: 'development',
    LOG_PATH: `${DEFAULT_SERVER_ROOT}/logs/log.txt`
  };


  it('should return an envVars object with all keys set to their default values', () => {
    let envVars = getEnvVars(path, Object.freeze, __dirname, {});

    assert.deepEqual(envVars, EXPECTED_DEFAULT_CONFIG, 'The config was not correct');
  });

  it('should return an envVars object with all keys set to the passed in values', () => {
    let envVars = getEnvVars(path, Object.freeze, __dirname, EXPECTED_ENV_CONFIG);

    assert.deepEqual(envVars, EXPECTED_ENV_CONFIG, 'The config was not correct');
  });
});
