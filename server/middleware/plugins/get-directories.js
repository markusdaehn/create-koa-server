module.exports = function getDirectories(fs, path, server, logger) {
  const pluginsPath = path.join(server.root, '/middleware/plugins');
  logger.info(`getDirectories > : getting directories for directory ${pluginsPath}`);

  const files = fs.readdirSync(pluginsPath);
  logger.debug(`getDirectories: found ${files.length} files`)

  const directories = files.map((file) => {
    logger.debug(`getDirectories: joining directory ${pluginsPath} and file ${file}`);
    return path.join(pluginsPath, file);
  }).filter((file) => {
    return fs.statSync(file).isDirectory();
  }).map((directory) => {
    return {
      path: directory,
      name: path.parse(directory).name
    };
  });

  logger.info(`getDirectories < : returning directories ${directories.map((dir) => { return dir.path; })}`);
  return directories || []
}
