export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const SHOW_SYSTEM_MESSAGE = 'SHOW_SYSTEM_MESSAGE';
export const HIDE_SYSTEM_MESSAGE = 'HIDE_SYSTEM_MESSAGE';
export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SET_LOCALE = 'SET_LOCALE';
export const SET_MAIN_NAVIGATOR_SELECTED_ID = 'SET_MAIN_NAVIGATOR_SELECTED_ID';
export const SET_MAIN_NAVIGATOR_EXPANDED_ID = 'SET_MAIN_NAVIGATOR_EXPANDED_ID';

/**
 * Set selected id of the main departments navigator
 * @param id {string} id of the node to be set
 * @returns {function(*)}
 */
export function setMainNavigatorSelectedId(id) {
  return (dispatch) => {
    dispatch({ type: SET_MAIN_NAVIGATOR_SELECTED_ID, payload: id });
  };
}

/**
 * Set expanded node id of the main departments navigator
 * @param id {string} id of the node to be set
 * @param value {bool} value to remove or add from/to expanded array
 * @returns {function(*)}
 */
export function setMainNavigatorExpandedId(id, value) {
  return (dispatch) => {
    dispatch({ type: SET_MAIN_NAVIGATOR_EXPANDED_ID, payload: { id, value } });
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
export function showSystemMessage(body, title= 'System message', type= 'error') {
  return (dispatch) => {
    dispatch({ type: SHOW_SYSTEM_MESSAGE, payload: {body, title, type} });
  };
}

/**
 * Hide system message
 * @returns {function(*, *)}
 */
export function hideSystemMessage() {
  return (dispatch) => {
    dispatch({ type: HIDE_SYSTEM_MESSAGE, payload: {} });
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
 * @param locale {string} - locale to be set as current locale
 * @returns {function(*, *)}
 */
export function setLocale(locale) {
  return (dispatch) => {
    dispatch({ type: SET_LOCALE, payload: locale });
  };
}
