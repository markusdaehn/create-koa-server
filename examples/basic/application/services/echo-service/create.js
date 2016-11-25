
module.exports = function create(curry, createMetaRepo, config, logger) {
  logger.info('application.services.echo-service.create >');

  const metaRepo = createMetaRepo(config, logger);

  logger.info('application.services.echo-service.create <');
  return {
     echo: curry(echo)(metaRepo, config, logger)
  };
}

function echo(metaRepo, config, logger, data) {
  logger.info('application.services.echo-service.echo > <');

  return {
    succeeded: true,
    payload: {
      echo: data,
      meta: metaRepo.get(),
      config
    }
  };
}
