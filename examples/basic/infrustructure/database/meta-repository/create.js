module.exports = function create(config, logger) {
  return {
    get: () => { return get(config, logger); }
  };
}


module.exports.get = function get(config, logger){
  logger.info('infrustructure.database.meta-repository > <');

  return {
    version: '1.0.1',
    name: 'basic application',
    config
  };
}
