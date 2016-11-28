module.exports = function toCamelCase(str) {
  return str.replace(/\b-([a-z])/g, function(all, char) { return char.toUpperCase() });
}
