/**
 * Price Component.
 * Placeholder fot the description
 * @module Price
 */
import React from 'react';
import PropTypes from 'prop-types';

import './Price.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Price = ({ retail, sale, currency = '$' }) => {

  const format = (number) => {
    const price = Math.ceil(number * 100).toString();
    return (
      <>
      <span className="Price__mark Price__mark_shifted">$</span>
      <span className="Price__integer">{price.substr(0, price.length-2) || 0}</span>
      <span className="Price__separator">.</span>
      <span className="Price__fraction">{price.substr(-2)}</span>
      </>
    );
  };


  return (
    <>
      {(sale > 0
        && sale !== retail
        && (
          <>
          <span className="Price Price_sale">
              {format(sale)}
            </span>
          <span className="Price Price_old">
              {format(retail)}
            </span>
          </>
        )) || (
        <span className="Price">
        {format(retail)}
      </span>
      )}
    </>
  );
};

Price.propTypes = propTypes;
Price.defaultProps = defaultProps;

export default Price;
