/**
 * Price Component.
 * Placeholder fot the description
 * @module Price
 */
import React from 'react';
import PropTypes from 'prop-types';
import FormatPrice from '../../Price';


import './Price.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */

};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {

};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Price = ({ retail, sale, currency = '$' }) => {
  return (
    <>
    {(sale > 0
      && sale !== retail
      && (
        <>
        <span className="Price Price_sale">
              {<FormatPrice value={sale} currency={currency}/>}
            </span>
        <span className="Price Price_old">
              {<FormatPrice value={retail} currency={currency}/>}
            </span>
        </>
      )) || (
      <span className="Price">
        {<FormatPrice value={retail} currency={currency}/>}
      </span>
    )}
    </>
  );
};

Price.propTypes = propTypes;
Price.defaultProps = defaultProps;

export default Price;
