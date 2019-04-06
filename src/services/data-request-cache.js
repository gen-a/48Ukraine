import { searchToString } from '../utils/route';
import { cancelablePromise } from '../utils/cancelable-promise';
import { get as getRequest } from './axios-request';

/**
 * Data cache store object
 */
export const store = {};

/**
 * @param key {String}
 * @returns {bool}
 */
export const isSet = key => key in store;

/**
 * @param key {String}
 * @param value {*}
 */
export const write = (key, value) => {
  store[key] = value;
};

/**
 * @param key {String}
 * @returns {*}
 */
export const read = key => store[key];

/**
 * Generate key
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 * @return {String}
 */
export const locationToKey = (url, data) => `${url}${searchToString(data)}`;

/**
 * Send request to he server
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 */
export const get = (url, data) => {
  const key = locationToKey(url, data);
  if (isSet(key)) {
    return cancelablePromise(Promise.resolve(read(key)));
  }
  return cancelablePromise(
    getRequest(url, data)
      .then((response) => {
        write(key, response);
        return read(key);
      })
  );
};
