module.exports = function getDirectories(fs, path, server, logger) {
  logger.info(`getDirectories > : getting directories for directory ${server.root}`);

  let files = fs.readdirSync(server.root);
  logger.debug(`getDirectories: found ${files.length} files`)

  let directories = files.map((file) => {
    logger.debug(`getDirectories: joining directory ${server.root} and file ${file}`);
    return path.join(server.root, file);
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
