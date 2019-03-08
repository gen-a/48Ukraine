import axios from 'axios';

/**
 * Send request to he server
 * @param type {String} - request type
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 * @param cb {Function} - callback function
 */
const sendRequest = (type, url, data, cb) => {
  axios[type](url, data)
    .then(response => cb(response.data))
    .catch(err => cb({ message: err.message, error: 1, data: {} }));
};

/**
 * Send request to he server
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 * @param cb {Function} - callback function
 */
export const post = (url, data, cb) => {
  sendRequest('post', url, data, cb);
};

/**
 * Send request to he server
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 * @param cb {Function} - callback function
 */
export const get = (url, data, cb) => {
  sendRequest('get', url, data, cb);
};

/**
 * Send request to he server
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 * @param cb {Function} - callback function
 */
export const put = (url, data, cb) => {
  sendRequest('put', url, data, cb);
};

