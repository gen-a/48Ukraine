export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const SHOW_SYSTEM_MESSAGE = 'SHOW_SYSTEM_MESSAGE';
export const HIDE_SYSTEM_MESSAGE = 'HIDE_SYSTEM_MESSAGE';
export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SET_LOCALE = 'SET_LOCALE';

/**
 * Fetching customer profile data from the server
 * @returns {function(*, *)}
 */
export function setWindowSize(data) {
  return (dispatch, getState) => {
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
export function showSystemMessage(body, title= 'System message', type= 'error') {
  return (dispatch, getState) => {
    dispatch({ type: SHOW_SYSTEM_MESSAGE, payload: {body, title, type} });
  };
}

/**
 * Hide system message
 * @returns {function(*, *)}
 */
export function hideSystemMessage() {
  return (dispatch, getState) => {
    dispatch({ type: HIDE_SYSTEM_MESSAGE, payload: {} });
  };
}
/**
 * Hide loader
 * @returns {function(*, *)}
 */
export function hideLoader() {
  return (dispatch, getState) => {
    dispatch({ type: HIDE_LOADER, payload: {} });
  };
}
/**
 * Show loader
 * @returns {function(*, *)}
 */
export function showLoader() {
  return (dispatch, getState) => {
    dispatch({ type: SHOW_LOADER, payload: {} });
  };
}
/**
 * Hide toast
 * @returns {function(*, *)}
 */
export function hideToast() {
  return (dispatch, getState) => {
    dispatch({ type: HIDE_TOAST, payload: {} });
  };
}
/**
 * Show toast
 * @returns {function(*, *)}
 */
export function showToast(message) {
  return (dispatch, getState) => {
    dispatch({ type: SHOW_TOAST, payload: message });
  };
}

/**
 * Set application locale
 * @returns {function(*, *)}
 */
export function setLocale(loacale) {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOCALE, payload: loacale });
  };
}
