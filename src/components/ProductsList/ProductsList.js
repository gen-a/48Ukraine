/**
 * ProductsList Component.
 * Placeholder fot the description
 * @module ProductsList
 */
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import Pagination from '../UI/Pagination';
import { IMG_PRODUCTS_DIR } from '../../config/app';

import './ProductsList.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Function for add to cart. */
  addToCart: PropTypes.func,
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
  addToCart: console.log,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ProductsList = ({ pagesTotal, paginationUrl, products, currentPage, inCartQuantities, addToCart }) => {
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
          priceRetail={product.price.retail}
          priceSale={product.price.sale}
          inCart={inCartQuantities[product.id] || 0}
          image={`${IMG_PRODUCTS_DIR}/${product.image.sm}`}
          attributesInfo={product.attributesInfo}
          addToCart={() => addToCart({
            id: product.id,
            price: product.price.sale || product.price.retail,
            name: product.name,
            thumbnail: `${IMG_PRODUCTS_DIR}/${product.image.sm}`,
          })}
        />
      ))}
    </div>
    </>
  );
};

ProductsList.propTypes = propTypes;
ProductsList.defaultProps = defaultProps;

export default ProductsList;
