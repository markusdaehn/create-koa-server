module.exports = getMiddlwares;

function getMiddlwares(getModule, getDirectories, toCamelCase, dirPath, logger) {
  logger.trace(`server.middlware.helpers.get-middlewares > : getting middlewares`);

  const directories = getDirectories(dirPath, logger);

  let middlewares = {}, middlewareNames = [];

  directories.forEach((directory) => {
    let propName = toCamelCase(directory.name); middlewareNames.push(propName);
    logger.debug(`server.middlware.helpers.get-middlewares: converted dirname ${directory.name} to camelcase ${propName}`);

    logger.debug(`server.middlware.helpers.get-middlewares: defining middleware property ${propName} for ${directory.path}`);
    middlewares[propName] = getModule(directory.path);
  });

  logger.trace(`server.middlware.helpers.get-middlewares < : returning middlewares ${middlewareNames}`);
  return middlewares;
}
