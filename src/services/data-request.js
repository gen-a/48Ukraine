import { get as getRequest, put as putRequest, post as postRequest } from './axios-request';
import { cancelablePromise } from '../utils/cancelable-promise';

/**
 * Send request to he server
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 */
export const get = (url, data) => cancelablePromise(getRequest(url, data));
/**
 * Send request to he server
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 */
export const post = (url, data) => cancelablePromise(postRequest(url, data));
/**
 * Send request to he server
 * @param url {String} - API address for the request
 * @param data {Object} - data object
 */
export const put = (url, data) => cancelablePromise(putRequest(url, data));
