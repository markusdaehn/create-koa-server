module.exports = function getDirectories(fs, path, dirPath, logger) {
  logger.trace(`server.middlware.helpers.get-directories > : getting directories for folder ${dirPath}`);

  const files = getFiles(fs, dirPath, logger);

  const directories = files.map((file) => {
    logger.debug(`server.middlware.helpers.get-directories: joining directory ${dirPath} and file ${file}`);
    return path.join(dirPath, file);
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

function getFiles(fs, dirPath,  logger) {
  logger.trace(`server.middlware.helpers.get-files > : getting files`);
  let files = [];

  try {
    files = fs.readdirSync(dirPath);
    logger.debug(`server.middlware.helpers.get-files: found ${files.length} files`);
  } catch(e) {
    //@NOTE: Could be no middlware folder, so it is ok.
    logger.debug({exception: e, func_name: 'server.middlware.helpers.get-files'});
  }

  logger.trace('server.middlware.helpers.get-files <');
  return files
}
