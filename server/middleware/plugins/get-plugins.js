module.exports = getPlugins;

function getPlugins(getDirectories, toCamelCase, server, logger) {
  logger.info(`getPlugins > : getting plugins`);
  console.log('###', getDirectories)
  const directories = getDirectories(server, logger);

  let plugins = {}, pluginNames = [];

  directories.forEach((directory) => {
    let propName = toCamelCase(directory.name); pluginNames.push(propName);
    logger.debug(`getPlugins: converted dirname ${directory.name} to camelcase ${propName}`);

    logger.debug(`getPlugins: defining plugin property ${propName} for ${directory.path}`);
    plugins[propName] = require(directory.path);
  });

  logger.info(`getPlugins < : returning plugins ${pluginNames}`)
  return plugins;
}
