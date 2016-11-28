module.exports = function getDirectories(fs, path, folder, server, logger) {
  const middlewaresPath = path.join(server.root, folder);
  logger.info(`server.middlware.helpers.get-directories > : getting directories for directory ${middlewaresPath}`);

  const files = fs.statSync(middlewaresPath) ? fs.readdirSync(middlewaresPath) : [];
  logger.debug(`server.middlware.helpers.get-directories: found ${files.length} files`)

  const directories = files.map((file) => {
    logger.debug(`server.middlware.helpers.get-directories: joining directory ${middlewaresPath} and file ${file}`);
    return path.join(middlewaresPath, file);
  }).filter((file) => {
    return fs.statSync(file).isDirectory();
  }).map((directory) => {
    return {
      path: directory,
      name: path.parse(directory).name
    };
  });

  logger.info(`server.middlware.helpers.get-directories < : returning directories ${directories.map((dir) => { return dir.path; })}`);
  return directories || []
}
