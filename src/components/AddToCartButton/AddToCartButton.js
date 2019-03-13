/**
 * AddToCartButton Component.
 * Placeholder fot the description
 * @module AddToCartButton
 */
import React from 'react';
import PropTypes from 'prop-types';
import Cart from '@material-ui/icons/ShoppingBasket';
import Tooltip from '@material-ui/core/Tooltip';

import './AddToCartButton.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** String label of the button. */
  label: PropTypes.string,
  /** Number in cart tooltip. */
  numberInCartLabel: PropTypes.string,
  /** Object in cart quantities. */
  inCartQuantities: PropTypes.shape({}),
  /** On button click handler. */
  callAddProductToCart: PropTypes.func,
  /** Product object fro cart. */
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  label: '',
  numberInCartLabel: '',
  inCartQuantities: {},
  callAddProductToCart: () => {
  },
};


/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const AddToCartButton = ({ product, label, inCartQuantities, numberInCartLabel, callAddProductToCart }) => {
  const numberInCart = parseInt(inCartQuantities[product.id], 10);
  return (
    <div className="AddToCartButton" onClick={() => callAddProductToCart(product)}>

      <div className="AddToCartButton__icon">
        <Cart
          style={{
            width: '24px',
            height: '24px',
            position: 'absolute',
            top: '12px',
            left: '12px',
          }}
        />
        {numberInCart > 0 && (
          <Tooltip
            title={numberInCartLabel}
            aria-label={numberInCartLabel}
            placement="left"
          >

            <div className="AddToCartButton__inCart">
              {numberInCart}
            </div>
          </Tooltip>
        )}
      </div>
      <div className="AddToCartButton__label">
        {label}
      </div>
    </div>
  );
};

AddToCartButton.propTypes = propTypes;
AddToCartButton.defaultProps = defaultProps;

export default AddToCartButton;
