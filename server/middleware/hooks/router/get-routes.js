module.exports = function getRoutes(get, glob, path, root) {
  const routes = glob.sync(path.resolve(root, './routes/**/index.js'), { cwd: root, ignore:['./*']}).map(function(file) {
    return get(file);
  });

  return routes;
}
