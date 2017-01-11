module.exports = function create(root) {
  return {
    IP: undefined,
    PORT: 8080,
    LOG_PATH: `${root}/logs/log.txt`,
    LOG_LEVEL: 'error',
    NODE_ENV: 'default'
  };
}
