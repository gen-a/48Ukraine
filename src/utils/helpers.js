/**
 * Replace placeholdres in route path with given data
 * @param route {String}
 * @param data {object}
 * @returns {*}
 */
export const replaceInRoute = (route, data) => {
  let result = route;
  Object.keys(data).forEach((k) => {
    result = result.replace(new RegExp(`:${k}`), data[k]);
  });
  return result;
};

/**
 * Merge objects immutable
 * @param state {object}
 * @param data {object}
 * @returns {object}
 */
export const updateObj = (state, data) => {
  if (typeof (data) !== 'object') {
    return data;
  }
  const o = { ...state };
  Object.keys(data).forEach((k) => {
    o[k] = updateObj(o[k], data[k]);
  });
  return o;
};
