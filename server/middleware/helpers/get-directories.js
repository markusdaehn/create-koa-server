module.exports = function getDirectories(fs, path, folder, server, logger) {
  const middlewaresPath = path.join(server.root, folder);
  logger.trace(`server.middlware.helpers.get-directories > : getting directories for folder ${middlewaresPath}`);

  const files = getFiles(fs, server, logger, middlewaresPath);

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

  logger.trace(`server.middlware.helpers.get-directories < : returning directories ${directories.map((dir) => { return dir.path; })}`);
  return directories || []
}

function getFiles(fs, server, logger, middlewaresPath) {
  logger.trace(`server.middlware.helpers.get-files > : getting files`);

  let files = [];

  try {
    files = fs.readdirSync(middlewaresPath);
    logger.debug(`server.middlware.helpers.get-files: found ${files.length} files`);
  } catch(e) {
    //@NOTE: Could be no folder, so it is ok.
    logger.debug('server.middlware.helpers.get-files: ', {exception: e});
  }

  logger.trace('server.middlware.helpers.get-files <');
  return files
}
