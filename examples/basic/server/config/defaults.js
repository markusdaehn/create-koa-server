const path = require('path');

module.exports = {
  IP: undefined,
  PORT: 8080,
  LOG_PATH: `${path.resovle(__dirname, '..')}/logs/log.txt`,
  LOG_LEVEL: 'error',
  NODE_ENV: 'default'
}
