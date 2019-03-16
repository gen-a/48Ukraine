import axios from 'axios';
import { SubmissionError, reset } from 'redux-form';
import { URL_UPDATE_USER } from '../config/api'

export const UPDATE_PROFILE_PENDING = 'UPDATE_PROFILE_PENDING';
export const UPDATE_PROFILE_FULFILLED = 'UPDATE_PROFILE_FULFILLED';
export const UPDATE_PROFILE_REJECTED = 'UPDATE_PROFILE_REJECTED';

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
 * Update customer profile data
 * @param data {object}
 * @returns {function(*, *)}
 */
export function updateProfile(data) {
  return (dispatch, getState) => {
    dispatch(
      { type: UPDATE_PROFILE_PENDING, payload: { } }
    );
    return axios.put(URL_UPDATE_USER, data)
      .then((result) => {
        const res = result.data;
        if (result.success){
          dispatch({ type: UPDATE_PROFILE_FULFILLED, payload: { profile: result.data } });
        } else {
          throw new SubmissionError({ ...res.data, _error: res.message });
        }
      })
      .catch((err) => {
        dispatch({ type: UPDATE_PROFILE_REJECTED, payload: err });
        if( err instanceof SubmissionError ){
          throw err;
        }else{
          throw new SubmissionError({ _error: err.message });
        }
      });
  };
}
