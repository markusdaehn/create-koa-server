module.exports = function getRoutes(get, path, root) {
  return get(path.join(root, 'routes'));
}
