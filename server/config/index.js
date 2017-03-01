const getAppConfigs = require('./get-app-configs');
const getRootConfig = require('./get-root-config');
const getConfigs = require('./get-configs');
const normalizeRootConfig = require('./normalize-root-config');
const normalizeAppConfigs = require('./normalize-app-configs');

module.exports = {
  getAppConfigs,
  getRootConfig,
  getConfigs,
  normalizeRootConfig,
  normalizeAppConfigs
};
