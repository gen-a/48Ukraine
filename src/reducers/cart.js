import {
  UPDATE_PRODUCTS_IN_CART,
  CHECKOUT_FULFILLED,
  CHECKOUT_PENDING,
  CHECKOUT_REJECTED,
  CLEAR_CART,
  INITIALIZE_CART,
} from '../actions/cart';


const initialState = {
  quantities: {},
  products: [],
  total: 0,
  count: 0,
  isBusy: false
};

/**
 * Calculate total sum of the products
 * @param products
 * @returns {number}
 */

const getTotal = (products) => {
  let total = 0;
  products.forEach(p => total += p.price * p.quantity);
  return total;
};


/**
 * Calculate number of the products
 * @param products
 * @returns {number}
 */
const getCount = (products) => {
  let count = 0;
  products.forEach(p => count += p.quantity);
  return count;
};

/**
 * Create quantities of products object
 * @param products
 * @returns {object}
 */

const getQuantities = (products) => {
  const quantities = {};
  products.forEach(p => quantities[p.id] = p.quantity);
  return quantities;
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_CART:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_CART:
      return {
        ...state,
        products: [],
        total: 0,
        count: 0,
        quantities: {}
      };
    case UPDATE_PRODUCTS_IN_CART:
      return {
        ...state,
        products: action.payload,
        total: getTotal(action.payload),
        count: getCount(action.payload),
        quantities: getQuantities(action.payload),
      };
    case CHECKOUT_PENDING:
      return {
        ...state,
        isBusy: true
      };
    case CHECKOUT_FULFILLED:
    case CHECKOUT_REJECTED:
      return {
        ...state,
        isBusy: false
      };
    default:
      return state;
  }
};

export default cart;
