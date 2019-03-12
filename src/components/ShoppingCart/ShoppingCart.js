/**
 * ShoppingCart Component.
 * Placeholder fot the description
 * @module ShoppingCart
 */
import React from 'react';
import PropTypes from 'prop-types';
import Cart from '@material-ui/icons/ShoppingBasket';
import Price from '../Formatters/Price';
import {Motion, spring} from 'react-motion';
import colors from '../../_colors.scss';

import './ShoppingCart.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** List of products. */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  /** Total shopping cart products cost. */
  total: PropTypes.number,
  /** Number of items in shopping cart. */
  count: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  products: [],
  total: 0,
  count: 0,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ShoppingCart = ({ count, total }) => {
  return (
    <button className={ count ? 'ShoppingCart ShoppingCart_isVisible' : 'ShoppingCart'}>
      <div className="ShoppingCart__icon">
        { count  && (
          <div className="ShoppingCart__count">
            {count}
          </div>
        )}
        <Cart
          style={{
            width: '24px',
            height: '24px',
            position: 'absolute',
            top: '12px',
            left: '12px'
          }}
        />
      </div>

      <div className="ShoppingCart__price">
        <Motion defaultStyle={{ x: 0 }} style={{ x: spring(total) }}>
          {value => <Price value={value.x}/>}
        </Motion>
      </div>
    </button>
  );
};

ShoppingCart.propTypes = propTypes;
ShoppingCart.defaultProps = defaultProps;

export default ShoppingCart;
