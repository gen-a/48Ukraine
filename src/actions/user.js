import axios from 'axios';

import { URL_UPDATE_USER_PROFILE, URL_UPDATE_USER_PASSWORD, URL_LOG_OUT } from '../config/api';
import { handleFormSubmissionError, handleFormSubmissionSuccess } from './app';

axios.defaults.withCredentials = true;

export const UPDATE_PROFILE_PENDING = 'UPDATE_PROFILE_PENDING';
export const UPDATE_PROFILE_FULFILLED = 'UPDATE_PROFILE_FULFILLED';
export const UPDATE_PROFILE_REJECTED = 'UPDATE_PROFILE_REJECTED';

export const UPDATE_PASSWORD_PENDING = 'UPDATE_PASSWORD_PENDING';
export const UPDATE_PASSWORD_FULFILLED = 'UPDATE_PASSWORD_FULFILLED';
export const UPDATE_PASSWORD_REJECTED = 'UPDATE_PASSWORD_REJECTED';

export const LOG_OUT_PENDING = 'LOG_OUT_PENDING';
export const LOG_OUT_FULFILLED = 'LOG_OUT_FULFILLED';
export const LOG_OUT_REJECTED = 'LOG_OUT_REJECTED';

export const SET_AUTHENTICATED_DATA = 'SET_AUTHENTICATED_DATA';

/**
 * Remove open screen from list
 * @returns {function(*)}
 */
export function setAuthenticatedUser(data) {
  return (dispatch) => {
    dispatch({ type: SET_AUTHENTICATED_DATA, payload: data });
  };
}


/**
 * Logout current user
 * @returns {function(*, *)}
 */
export function logOut() {
  return (dispatch, getState) => {
    dispatch(
      { type: LOG_OUT_PENDING, payload: {} }
    );
    return axios.get(URL_LOG_OUT)
      .then(result => result.data)
      .then((result) => {
        if (result.error === 0) {
          dispatch({ type: LOG_OUT_FULFILLED, payload: {} });
        }
      })
      .catch((err) => {
        dispatch({ type: LOG_OUT_REJECTED, payload: err });
      });
  };

}


/**
 * Update current user password
 * @param data
 * @returns {function(*, *)}
 */
export function updatePassword(data) {
  return (dispatch, getState) => {
    dispatch(
      { type: UPDATE_PASSWORD_PENDING, payload: {} }
    );
    return axios.put(URL_UPDATE_USER_PASSWORD, data)
      .then(result => handleFormSubmissionSuccess( UPDATE_PASSWORD_FULFILLED, result.data )(dispatch, getState))
      .catch(error => handleFormSubmissionError(UPDATE_PASSWORD_REJECTED, error)(dispatch, getState));
  };

}

/**
 * Update customer profile data
 * @param data {object}
 * @returns {function(*, *)}
 */
export function updateProfile(data) {
  return (dispatch, getState) => {
    dispatch(
      { type: UPDATE_PROFILE_PENDING, payload: {} }
    );
    return axios.put(URL_UPDATE_USER_PROFILE, data)
      .then(result => handleFormSubmissionSuccess( UPDATE_PROFILE_FULFILLED, result.data )(dispatch, getState))
      .catch(error => handleFormSubmissionError(UPDATE_PROFILE_REJECTED, error)(dispatch, getState));
  };
}
