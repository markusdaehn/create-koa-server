module.exports = getPlugins;

function getPlugins(toCamelCase, getDirectories, dirname) {
  const directories = getDirectories(dirname);

  let plugins = {};

  directories.forEach((directory) => {
    let dirName = path.dirname(directory);
    let propName = toCamelCase(directory);

    Object.defineProperty(plugins, propName, {
      value: require(directory),
      enumerable: true,
      writable: false,
      configurable: false
    });
  });

  return plugins;
}
