/**
 * Price Component.
 * Placeholder fot the description
 * @module Price
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Numeric value of the price in coins. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) ,
  /** Currency mark. */
  currency: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  value: '0',
  currency: '$',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Price = ({ value , currency}) => {

  const price = value.toString();

  const classes = {
    integer: {
      fontWeight: 700,
      padding: '0 1px'
    },
    separator: {
      display: 'none'
    },
    fraction: {
      baselineShift: 'sub',
      fontSize: '.625em',
      top: '-.5em',
      position: 'relative'
    },
    mark: {
      position: 'relative',
      fontWeight: 400,
      baselineShift: 'sub',
      fontSize: '.625em',
      top: '-.5em',
    }
  };


  return (
    <>
      <span style={classes.mark}>{currency}</span>
      <span style={classes.integer}>{price.substr(0, price.length - 2) || 0}</span>
      <span style={classes.separator}>.</span>
      <span style={classes.fraction}>{price.substr(-2)}</span>
    </>
  );
};

Price.propTypes = propTypes;
Price.defaultProps = defaultProps;

export default Price;
