import {importDictionaryArticles} from './dictionary';

export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';
export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SET_LOCALE = 'SET_LOCALE';
export const SET_CURRENT_DEPARTMENT = 'SET_CURRENT_DEPARTMENT';
export const EXPAND_NODE_OF_DEPARTMENT_TREE = 'EXPAND_NODE_OF_DEPARTMENT_TREE';
export const SET_OPEN_DRAWER = 'SET_OPEN_DRAWER';
/**
 * Set selected id of the main departments navigator
 * @param value {string} id of the node to be set
 * @returns {function(*)}
 */
export function setDepartment(value) {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_DEPARTMENT, payload: value });
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
export function showFlashMessage(body, title= 'System message', type= 'error') {
  return (dispatch) => {
    dispatch({ type: SHOW_FLASH_MESSAGE, payload: {body, title, type} });
  };
}

/**
 * Hide system message
 * @returns {function(*, *)}
 */
export function hideFlashMessage() {
  return (dispatch) => {
    dispatch({ type: HIDE_FLASH_MESSAGE, payload: {} });
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
  return (dispatch) => {
    dispatch({ type: SET_LOCALE, payload: locale });
    importDictionaryArticles(locale)(dispatch);
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