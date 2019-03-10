/**
 * Button Component.
 * Placeholder fot the description
 * @module Button
 */
import React from 'react';
import PropTypes from 'prop-types';
import Cart from '@material-ui/icons/ShoppingBasket';
import Tooltip from '@material-ui/core/Tooltip';

import './Button.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** String label of the button. */
  label: PropTypes.string,
  /** Number in cart tooltip. */
  numberInCartLabel: PropTypes.string,
  /** Number products in cart. */
  numberInCart: PropTypes.number,
  /** On button click handler. */
  onClick: PropTypes.func,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  label: '',
  numberInCartLabel: '',
  numberInCart: 10,
  onClick: () => {
  },
};


/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Button = ({ label, numberInCart, numberInCartLabel, onClick }) => {
  return (
    <div className="Button" onClick={() => onClick()}>

      <div className="Button__icon">
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

            <div className="Button__inCart">
              {numberInCart}
            </div>
          </Tooltip>
        )}
      </div>
      <div className="Button__label">
        {label}
      </div>
    </div>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
