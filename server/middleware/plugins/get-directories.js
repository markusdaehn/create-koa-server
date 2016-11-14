module.exports = function getDirectories(fs, path, dirname, server, logger) {
  logger.info(`getDirectories > : getting directories for directory ${dirname}`);

  let files = fs.readdirSync(dirname);
  logger.debug(`getDirectories: found ${files.length} files`)

  let directories = files.map((file) => {
    logger.debug(`getDirectories: joining directory ${dirname} and file ${file}`);
    return path.join(dirname, file);
  }).filter((file) => {
    return fs.statSync(file).isDirectory();
  }).map((directory) => {
    return {
      path: directory,
      name: path.parse(directory).name
    }
  });

  logger.info(`getDirectories < : returning directories ${directories.map((dir) => { return dir.path; })}`);
  return directories || []
}
