
const { assert } = require('chai');
const getEnvVars = require('./get-env-vars');
const path = require('path');

describe('server config get-env-vars -- integration', () => {
  const DEFAULT_SERVER_ROOT = path.resolve(__dirname + '../');
  const EXPECTED_DEFAULT_CONFIG = {
      SERVER_ROOT: DEFAULT_SERVER_ROOT,
      IP: undefined,
      PORT: 8080,
      NODE_ENV: undefined,
      LOG_LEVEL: 'error',
      LOG_PATH: `${DEFAULT_SERVER_ROOT}/logs/log.txt`
  };

  it('should return an envVars object with all keys set to their default values', () => {
    let envVars = getEnvVars({}, DEFAULT_SERVER_ROOT);

    assert.deepEqual(envVars, EXPECTED_DEFAULT_CONFIG, 'The config was not correct');
  });
});
