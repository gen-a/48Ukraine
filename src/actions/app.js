import uuid from 'uuid/v4';
import axios from 'axios';
import { SubmissionError } from 'redux-form';

import { importDictionaryArticles } from './dictionary';
import { URL_FETCH_INITIAL_STATE } from '../config/api';
import { SET_AUTHENTICATED_DATA } from './user';
import { INITIALIZE_CART } from './cart';

axios.defaults.withCredentials = true;

export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export const ADD_OPEN_SCRIM = 'ADD_OPEN_SCRIM';
export const REMOVE_OPEN_SCRIM = 'REMOVE_OPEN_SCRIM';

export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const REMOVE_FLASH_MESSAGE = 'REMOVE_FLASH_MESSAGE';
export const REMOVE_ALL_FLASH_MESSAGES = 'REMOVE_ALL_FLASH_MESSAGES';

export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SET_LOCALE = 'SET_LOCALE';
export const EXPAND_NODE_OF_DEPARTMENT_TREE = 'EXPAND_NODE_OF_DEPARTMENT_TREE';
export const SET_OPEN_DRAWER = 'SET_OPEN_DRAWER';

export const FETCH_INITIAL_STATE_FULFILLED = 'FETCH_INITIAL_STATE_FULFILLED';
export const FETCH_INITIAL_STATE_REJECTED = 'FETCH_INITIAL_STATE_REJECTED';
export const FETCH_INITIAL_STATE_PENDING = 'FETCH_INITIAL_STATE_PENDING';


/**
 * Load initial state from the server
 * @param data {object} - request parameters
 * @returns {function(*, *)}
 */
export function fetchInitialSate(data) {
  return (dispatch, getState) => {
    dispatch(
      { type: FETCH_INITIAL_STATE_PENDING, payload: {} }
    );
    axios.get(URL_FETCH_INITIAL_STATE, data)
      .then(result => result.data)
      .then((result) => {
        const { user, cart, ...otherDate } = result.data;
        if (user) {
          dispatch({ type: SET_AUTHENTICATED_DATA, payload: user });
        }
        if (cart) {
          dispatch({ type: INITIALIZE_CART, payload: cart });
        }
        dispatch({ type: FETCH_INITIAL_STATE_FULFILLED, payload: otherDate });
      })
      .catch(err => dispatch({ type: FETCH_INITIAL_STATE_REJECTED, payload: err }));
  };
}


/**
 * Remove open screen from list
 * @returns {function(*)}
 */
export function removeOpenScrim(id) {
  return (dispatch) => {
    dispatch({ type: REMOVE_OPEN_SCRIM, payload: id });
  };
}

/**
 * Add open screen from list
 * @returns {function(*)}
 */
export function addOpenScrim(id) {
  return (dispatch) => {
    dispatch({ type: ADD_OPEN_SCRIM, payload: id });
  };
}

/**
 * Set expanded node id of the main departments navigator
 * @param id {string} id of the node to be set
 * @param value {bool} value to remove or add from/to expanded array
 * @returns {function(*)}
 */
export function expandNodeOfDepartmentTree(id, value) {
  return (dispatch) => {
    dispatch({ type: EXPAND_NODE_OF_DEPARTMENT_TREE, payload: { id, value } });
  };
}

/**
 * Set window size
 * @returns {function(*, *)}
 */
export function setWindowSize(data) {
  return (dispatch) => {
    dispatch({ type: SET_WINDOW_SIZE, payload: data });
  };
}

/**
 * Show system message
 * @param body {string|Element} - body of the message
 * @param title {string} - title in the bar
 * @param type {string} - one of the error|info|success. It will be used for css style adjustment
 * @returns {function(*, *)}
 */
export function addFlashMessage(body, title = 'System message', type = 'error') {
  return (dispatch) => {
    const id = uuid();
    dispatch({ type: ADD_FLASH_MESSAGE, payload: { id, body, title, type } });
  };
}

/**
 * Remove message by its id
 * @param id {string} - id of the message for future removal
 * @returns {function(*, *)}
 */
export function removeFlashMessage(id) {
  return (dispatch) => {
    dispatch({ type: REMOVE_FLASH_MESSAGE, payload: id });
  };
}

/**
 * Remove all messages
 * @returns {function(*, *)}
 */
export function removeAllFlashMessages() {
  return (dispatch) => {
    dispatch({ type: REMOVE_ALL_FLASH_MESSAGES });
  };
}

/**
 * Hide loader
 * @returns {function(*, *)}
 */
export function hideLoader() {
  return (dispatch) => {
    dispatch({ type: HIDE_LOADER, payload: {} });
  };
}

/**
 * Show loader
 * @returns {function(*, *)}
 */
export function showLoader() {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: {} });
  };
}

/**
 * Hide toast
 * @returns {function(*, *)}
 */
export function hideToast() {
  return (dispatch) => {
    dispatch({ type: HIDE_TOAST, payload: {} });
  };
}

/**
 * Show toast
 * @param message {string} - text message of the toast
 * @returns {function(*, *)}
 */
export function showToast(message) {
  return (dispatch) => {
    dispatch({ type: SHOW_TOAST, payload: message });
  };
}

/**
 * Set application localization
 * And call import dictionary
 * @param locale {string} - locale to be set as current locale
 * @returns {function(*, *)}
 */
export function setLocale(locale) {
  return (dispatch, getState) => {
    if (getState().app.locale !== locale) {
      dispatch({ type: SET_LOCALE, payload: locale });
      importDictionaryArticles(locale)(dispatch);
    }
  };
}

/**
 * Set open panel  name
 * @param name {string} - name of the panel to be open
 * @returns {function(*, *)}
 */
export function setOpenDrawer(name) {
  return (dispatch) => {
    dispatch({ type: SET_OPEN_DRAWER, payload: name });
  };
}

/**
 * Handle success on form submission
 * @param type {string} - name of dispatch
 * @param response {*} - server response
 * @returns {function(*=)}
 */
export function handleFormSubmissionSuccess(type, response) {
  return (dispatch) => {
    const { error, data: payload, message } = response;
    if (error === 0) {
      dispatch({ type, payload });
      addFlashMessage(message, 'submission succeed', 'success')(dispatch);
    } else {
      throw new SubmissionError({ ...payload, _error: message });
    }
    return true;
  };
}

/**
 * Handle error on form submission
 * @param type {string} - name of dispatch
 * @param payload {*} - payload of dispatch
 * @returns {function(*=)}
 */
export function handleFormSubmissionError(type, payload) {
  return (dispatch) => {
    dispatch({ type, payload });
    const { errors: { _error }, message } = payload;
    if (payload instanceof SubmissionError) {
      addFlashMessage(_error, 'submission error', 'error')(dispatch);
      throw payload;
    } else {
      addFlashMessage(message, 'submission error', 'error')(dispatch);
      throw new SubmissionError({ _error: message });
    }
  };
}