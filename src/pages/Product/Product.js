import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { URL_FETCH_PRODUCT } from '../../config/api';
import { get } from '../../services/ajax';
import ProductLeaflet from '../../components/ProductLeaflet';
import { replaceInRoute } from '../../utils/helpers';
import { addProductToCart } from '../../actions/cart';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call add flash message handler. */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show loader handler. */
  callShowLoader: PropTypes.func.isRequired,
  /** Hide loader handler. */
  callHideLoader: PropTypes.func.isRequired,
  /** Show toast handler. */
  callShowToast: PropTypes.func.isRequired,
  /** Match parameters. */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Current locale. */
  locale: PropTypes.string.isRequired,
  /** Media query prefix. */
  mediaPrefix: PropTypes.string.isRequired,
  /** Call add product to cart. */
  callAddProductToCart: PropTypes.func.isRequired,
  /** Object in cart quantities. */
  inCartQuantities: PropTypes.shape({}),
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  inCartQuantities: {}
};


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    const { callShowLoader, match: { params: { id } } } = this.props;
    get(URL_FETCH_PRODUCT, { id }, this.onLoadProduct.bind(this));
    callShowLoader();
  }

  onLoadProduct({ error, message, data }) {
    const { callAddFlashMessage, callHideLoader, callShowToast } = this.props;
    callHideLoader();
    if (error === 0) {
      this.setState(prevState => update(prevState, {
        product: { $set: data }
      }));
      callShowToast('browse.info.product_has_been_loaded');
    } else {
      callAddFlashMessage(message, 'server response', 'error');
    }
  }

  render() {
    const { product } = this.state;
    const { callAddProductToCart, inCartQuantities, mediaPrefix } = this.props;

    if (Object.keys(product).length === 0) {
      return null;
    }

    return (
      <ProductLeaflet
        {...{ ...product, callAddProductToCart, inCartQuantities, mediaPrefix }}
      />
    );
  }
}

Product.propTypes = propTypes;
Product.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments,
    inCartQuantities: state.cart.quantities,
    mediaPrefix: state.app.window.mediaPrefix,
  }
);

const mapDispatchToProps = dispatch => (
  {
    callAddProductToCart: product => dispatch(addProductToCart(product)),
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(Product);
