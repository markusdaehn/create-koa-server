
module.exports = function getMountConfigs(path, getDirectories, mountsDir, logger) {
  return getDirectories(mountsDir, logger).map((directory) => {
    return {
      prefix: path.join('/', directory.name),
      root: directory.path
    }
  });
}
