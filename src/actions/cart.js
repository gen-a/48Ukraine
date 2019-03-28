import axios from 'axios';

import { reset } from 'redux-form';
import { URL_CHECKOUT, URL_STORE_CART } from '../config/api';
import { handleFormSubmissionError, handleFormSubmissionSuccess } from './app';

axios.defaults.withCredentials = true;

export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_PRODUCTS_IN_CART = 'UPDATE_PRODUCTS_IN_CART';
export const CHECKOUT_PENDING = 'CHECKOUT_PENDING';
export const CHECKOUT_FULFILLED = 'CHECKOUT_FULFILLED';
export const CHECKOUT_REJECTED = 'CHECKOUT_REJECTED';
export const INITIALIZE_CART = 'INITIALIZE_CART';

/**
 * Clear cart
 * @returns {function(*, *)}
 */
export function clearCart() {
  return (dispatch) => {
    dispatch({ type: CLEAR_CART });
  };
}


export function sendToServer() {
  return (dispatch, getState) => {
    return axios.post(URL_STORE_CART, getState().cart)
      .catch(console.log);
  }
}

/**
 * Add product to cart. Check if already exits increment number else add new object.
 * @param product
 * @returns {function(*, *)}
 */
export function addProductToCart(product) {
  return (dispatch, getState) => {
    const storedProducts = getState().cart.products;
    const stored = storedProducts.filter(p => p.id === product.id);
    if (stored.length > 0) {
      dispatch({
        type: UPDATE_PRODUCTS_IN_CART,
        payload: storedProducts.map((p) => {
          if (product.id === p.id) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        })
      });
    } else {
      dispatch({
        type: UPDATE_PRODUCTS_IN_CART,
        payload: [...storedProducts, { ...product, quantity: 1 }]
      });
    }
    sendToServer()(dispatch, getState);
  };
}

/**
 * Update product quantity in cart. If 0 remove the record. Otherwise set new quantity
 * @param id {String}
 * @param quantity {number}
 * @returns {function(*, *)}
 */
export function updateProductInCart(id, quantity = 0) {
  return (dispatch, getState) => {
    const storedProducts = getState().cart.products;
    if (quantity > 0) {
      dispatch({
        type: UPDATE_PRODUCTS_IN_CART,
        payload: storedProducts.map((p) => {
          if (id === p.id) {
            return { ...p, quantity };
          }
          return p;
        })
      });
    } else {
      dispatch({
        type: UPDATE_PRODUCTS_IN_CART,
        payload: storedProducts.filter(p => id !== p.id)
      });
    }
    sendToServer()(dispatch, getState);
  };
}

/**
 * Update current user password
 * @param data
 * @returns {function(*, *)}
 */
export function checkout(data) {
  return (dispatch, getState) => {
    dispatch(
      { type: CHECKOUT_PENDING, payload: {} }
    );
    const {
      cardCvc,
      cardExpiry,
      cardNumber,
      email,
      firstName,
      lastName,
      phone,
      toAddress,
      toCity,
      toFirstName,
      toLastName,
      toPhone,
      toZip
    } = data;

    return axios.post(URL_CHECKOUT, {
      cardCvc,
      cardExpiry,
      cardNumber,
      email,
      firstName,
      lastName,
      phone,
      toAddress,
      toCity,
      toFirstName,
      toLastName,
      toPhone,
      toZip,
      products: getState().cart.products
    })
      .then(result => handleFormSubmissionSuccess(
        CHECKOUT_FULFILLED,
        result.data
      )(dispatch, getState))
      .then(() => {
        clearCart()(dispatch);
        dispatch(reset('formCheckout'));
      })
      .catch(error => handleFormSubmissionError(CHECKOUT_REJECTED, error)(dispatch, getState));
  };
}