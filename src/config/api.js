export const API_PREFIX = `${process.env.REACT_APP_SERVER_URL}/data`;
export const URL_FETCH_USER = `${API_PREFIX}/fetch-user`;
export const URL_FETCH_DICTIONARY_ARTICLES = `${API_PREFIX}/dictionary-articles`;

export const URL_REQUEST_ACCESS_WITH_VISA = `${API_PREFIX}/auth/request-access/:visa`;
export const URL_LOG_OUT = `${API_PREFIX}/auth/logout`;
export const URL_UPDATE_USER_PASSWORD = `${API_PREFIX}/user/password`;
export const URL_UPDATE_USER_PROFILE = `${API_PREFIX}/user/profile`;
export const URL_FETCH_INITIAL_STATE  = `${API_PREFIX}/app/initial-state`;
export const URL_AUTH_CHECK_EMAIL = `${API_PREFIX}/auth/email`;
export const URL_AUTH_CHECK_PASSWORD = `${API_PREFIX}/auth/login`;
export const URL_AUTH_RESTORE_PASSWORD = `${API_PREFIX}/auth/request-access`;
export const URL_FETCH_PRODUCTS = `${API_PREFIX}/products`;
export const URL_FETCH_PRODUCT = `${API_PREFIX}/products/product`;

export const URL_FETCH_PRODUCTS_POPULAR= `${API_PREFIX}/products/popular`;
export const URL_FETCH_PRODUCTS_NEW= `${API_PREFIX}/products/new`;
export const URL_FETCH_PRODUCTS_ON_SALE= `${API_PREFIX}/products/on-sale`;

export const URL_CHECKOUT = `${API_PREFIX}/orders/add`;
export const URL_FETCH_USER_ORDERS = `${API_PREFIX}/orders/history`;
export const URL_SEARCH_HINT = `${API_PREFIX}/products/search/hint`;
export const URL_SEARCH_SUBMIT = `${API_PREFIX}/products/search`;