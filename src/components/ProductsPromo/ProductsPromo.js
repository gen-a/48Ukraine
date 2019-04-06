/**
 * ProductsPromo Component.
 * Placeholder fot the description
 * @module ProductsPromo
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import { connect } from 'react-redux';
import { get } from '../../services/data-request-cache';
import { localizePath } from '../../localization/index';
import { replaceInRoute } from '../../utils/route';
import { NavLink } from 'react-router-dom';
import Slider from '../UI/Slider';


import './ProductsPromo.scss';

const propTypes = {
  /** Object in cart quantities. */
  inCartQuantities: PropTypes.shape({}),
  /** Current locale. */
  locale: PropTypes.string.isRequired,
  /** URL to load products. */
  url: PropTypes.string.isRequired,
  /** Title of the list. */
  title: PropTypes.string,
  /** Data for more info link. */
  more: PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string,
  }),
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  inCartQuantities: {},
  title: '',
  more: { url: '', label: '' }
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
    this.setRecords = this.setRecords.bind(this);
  }

  componentDidMount() {
    const { url } = this.props;
    this.dataRequest = get(url, {});
    this.dataRequest.promise()
      .then(this.setRecords)
      .catch();
  }

  componentWillUnmount() {
    this.dataRequest.cancel();
  }

  setRecords({ data: { records } }) {
    this.setState(prevSate => ({
      ...prevSate,
      products: records
    }));
  }

  render() {
    const { products } = this.state;
    if (products.length === 0) {
      return null;
    }
    const { inCartQuantities, locale, title, more } = this.props;
    return (
      <>
      {title !== '' && <h2 className="ProductsPromo__title">{title}</h2>}
      <div className="ProductsPromo__entries">
        <Slider>
          {products.map(product => (
            <ProductCard
              type="verticalCompressed"
              url={replaceInRoute(localizePath('/product/:product', locale), { product: product.id })}
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              inCart={inCartQuantities[product.id] || 0}
              image={product.image.sm}
              attributesInfo={product.attributesInfo}
              isOnSale={product.isOnSale}
              isPopular={product.isPopular}
              isBrandNew={product.isBrandNew}
            />
          ))}
        </Slider>
      </div>
      {
        more.url !== ''
        && more.label !== ''
        && <NavLink to={more.url} className="ProductsPromo__more">{more.label}</NavLink>
      }
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
