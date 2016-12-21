module.exports = function deepMerge(curry, is, mergeWith, a, b) {
  return (is(Object, a) && is(Object, b)) ? mergeWith(curry(deepMerge)(curry, is, mergeWith), a, b) : b;
}
