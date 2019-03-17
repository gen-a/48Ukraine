/**
 * Filter object by keys
 * @param src
 * @param keys
 * @returns {{}}
 */
exports.filterByKeys = (src, keys) => {
  const result = {};
  keys.forEach((key) => {
    if (typeof(src[key]) !== 'undefined') {
      result[key] = src[key];
    }
  });
  return result;
};
