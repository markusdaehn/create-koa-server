const path = require('path');

module.exports = {
  PORT: 8080,
  LOG_PATH: `${path.resolve(__dirname, '..')}/logs/log.txt`,
  LOG_LEVEL: 'error'
}
