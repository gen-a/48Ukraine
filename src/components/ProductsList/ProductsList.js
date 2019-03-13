/**
 * ProductsList Component.
 * Placeholder fot the description
 * @module ProductsList
 */
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import Pagination from '../UI/Pagination';

import './ProductsList.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current page number. */
  currentPage: PropTypes.number,
  /** Total number of pages. */
  pagesTotal: PropTypes.number,
  /** URL template for url links generation. */
  paginationUrl: PropTypes.string,
  /** Products list data. */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.shape({
        retail: PropTypes.number,
        sale: PropTypes.number,
      }),
      image: PropTypes.shape({
        sm: PropTypes.string,
        fs: PropTypes.string,
      }),
      attributesInfo: PropTypes.string,
    })
  ),
  /** Object in cart quantities. */
  inCartQuantities: PropTypes.shape({}),
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  pagesTotal: 0,
  currentPage: 0,
  paginationUrl: '',
  products: [],
  inCartQuantities: {},
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ProductsList = ({ pagesTotal, paginationUrl, products, currentPage, inCartQuantities }) => {
  return (
    <>
    <Pagination
      key={paginationUrl}
      limit={5}
      total={pagesTotal}
      current={parseInt(currentPage, 10)}
      url={paginationUrl}
    />
    <div className="ProductsList">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          inCart={inCartQuantities[product.id] || 0}
          image={product.image.sm}
          attributesInfo={product.attributesInfo}
        />
      ))}
    </div>
    </>
  );
};

ProductsList.propTypes = propTypes;
ProductsList.defaultProps = defaultProps;

export default ProductsList;
