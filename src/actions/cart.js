import axios from 'axios';

import { SubmissionError, reset } from 'redux-form';
import { URL_CHECKOUT } from '../config/api';
import { addFlashMessage } from './app';

axios.defaults.withCredentials = true;

export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_PRODUCTS_IN_CART = 'UPDATE_PRODUCTS_IN_CART';
export const CHECKOUT_PENDING = 'CHECKOUT_PENDING';
export const CHECKOUT_FULFILLED = 'CHECKOUT_FULFILLED';
export const CHECKOUT_REJECTED = 'CHECKOUT_REJECTED';

/**
 * Clear cart
 * @returns {function(*, *)}
 */
export function clearCart() {
  return (dispatch) => {
    dispatch({ type: CLEAR_CART });
  };
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
    return axios.post(URL_CHECKOUT, { ...data, products: getState().cart.products })
      .then(result => result.data)
      .then((result) => {
        if (result.error === 0) {
          addFlashMessage('order.info.theOrderHasBeenPlaced', 'submission succeed', 'success')(dispatch);
          clearCart()(dispatch);
          dispatch(reset('formCheckout'));
          dispatch({ type: CHECKOUT_FULFILLED, payload: data });
        } else {
          throw new SubmissionError({ ...result.data, _error: result.message });
        }
      })
      .catch((err) => {
        dispatch({ type: CHECKOUT_REJECTED, payload: err });
        const { errors: { _error }, message } = err;
        if (err instanceof SubmissionError) {
          addFlashMessage(_error, 'submission error', 'error')(dispatch);
          clearCart()(dispatch);
          throw err;
        } else {
          addFlashMessage(message, 'submission error', 'error')(dispatch);
          throw new SubmissionError({ _error: message });
        }
      });
  };
}