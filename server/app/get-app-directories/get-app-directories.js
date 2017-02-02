const APPS_FOLDER = '/apps';

module.exports = function getAppDirectories(joinPath, concat, getDirectories, serverRoot, logger) {
  const appsPath = joinPath(serverRoot, APPS_FOLDER);
  const rootDir = [{ name: '', path: serverRoot }];
  const directories = concat(getDirectories(appsPath, logger), rootDir);

  return directories
}
