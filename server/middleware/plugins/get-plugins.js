module.exports = getPlugins;

function getPlugins(getDirectories, toCamelCase, server, logger) {
  logger.info(`getPlugins > : getting plugins`);
  console.log('###', getDirectories)
  const directories = getDirectories(server, logger);

  let plugins = {};

  directories.forEach((directory) => {
    let propName = toCamelCase(directory.name);
    logger.debug(`getPlugins: converted dirname ${directory.name} to camelcase ${propName}`);

    logger.debug(`getPlugins: defining plugin property ${propName} for ${directory.path}`);
    Object.defineProperty(plugins, propName, {
      value: require(directory.path),
      enumerable: true,
      writable: false,
      configurable: false
    });
  });

  logger.info(`getPlugins < : returning plugins ${Object.keys(plugins)}`)
  return plugins;
}
