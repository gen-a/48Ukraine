/**
 * PriceSticker Component.
 * Placeholder fot the description
 * @module PriceSticker
 */
import React from 'react';
import PropTypes from 'prop-types';
import FormatPrice from '../Formatters/Price';


import './PriceSticker.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Retail price. */
  retail: PropTypes.number.isRequired,
  /** Sale price. */
  sale: PropTypes.number,
  /** Currency sign. */
  currency: PropTypes.string,
  /** Font size. */
  fontSize: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  currency: '$',
  sale: 0,
  fontSize: '1.5rem'
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const PriceSticker = ({ retail, sale, currency, fontSize }) => {
  return (
    <>
    {(sale > 0
      && sale !== retail
      && (
        <>
        <span className="PriceSticker PriceSticker_sale" style={{ fontSize }}>
              {<FormatPrice value={sale} currency={currency}/>}
            </span>
        <span className="PriceSticker PriceSticker_old" style={{ fontSize }}>
              {<FormatPrice value={retail} currency={currency}/>}
            </span>
        </>
      )) || (
      <span className="PriceSticker" style={{ fontSize }}>
        {<FormatPrice value={retail} currency={currency}/>}
      </span>
    )}
    </>
  );
};

PriceSticker.propTypes = propTypes;
PriceSticker.defaultProps = defaultProps;

export default PriceSticker;
