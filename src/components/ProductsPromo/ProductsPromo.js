/**
 * ProductsPromo Component.
 * Placeholder fot the description
 * @module ProductsPromo
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import { connect } from 'react-redux';
import { URL_FETCH_PROMO_PRODUCTS } from '../../config/api';
import { get } from '../../services/ajax';
import { localizePath } from '../../localization/index';
import { replaceInRoute } from '../../utils/helpers';

import './ProductsPromo.scss';

const propTypes = {
  /** Object in cart quantities. */
  inCartQuantities: PropTypes.shape({}),
  /** Current locale. */
  locale: PropTypes.string.isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  inCartQuantities: {},
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class ProductsPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    get(URL_FETCH_PROMO_PRODUCTS, {}, ({ data: { records } }) => {
      this.setState((prevSate) => ({
        ...prevSate,
        products: records
      }));
    });
  }

  render() {
    const { products } = this.state;
    if (products.length === 0) {
      return null;
    }
    const { inCartQuantities, locale } = this.props;

    return (
      <>
      <h2 className="ProductsPromo__title">Promo products</h2>
      <div className="ProductsPromo">
          {products.map(product => (
            <ProductCard
              type="vertical"
              url={replaceInRoute(localizePath('/product/:product', locale), { product: product.id })}
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              inCart={inCartQuantities[product.id] || 0}
              image={product.image.sm}
              attributesInfo={product.attributesInfo}
              isOnSale
            />
          ))}
        </div>
      </>
    );
  }
}

ProductsPromo.propTypes = propTypes;
ProductsPromo.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments,
    inCartQuantities: state.cart.quantities
  }
);

export default connect(mapStateToProps, null)(ProductsPromo);
