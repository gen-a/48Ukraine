/**
 * ProductsList Component.
 * Placeholder fot the description
 * @module ProductsList
 */
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';

import './ProductsList.scss';

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
const ProductsList = ({ products }) =>{
  return (
    <div className="ProductsList">
      {products.map( product => <ProductCard {...product} />)}
    </div>
  );
};

ProductsList.propTypes = propTypes;
ProductsList.defaultProps = defaultProps;

export default ProductsList;
