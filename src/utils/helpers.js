export const replaceInRoute = (route, data) => {
  let result = route;
  Object.keys(data).forEach((key) =>{
    result = result.replace(new RegExp(`:${key}`), data[key]);
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
