import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutForm from '../../components/Forms/Checkout';
import PageTitle from '../../components/PageTitle';
import { localizePath } from '../../localization/index';
import { Redirect } from 'react-router-dom';

import './Checkout.scss'


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call add flash message handler */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show loader handler */
  callShowLoader: PropTypes.func.isRequired,
  /** Hide loader handler */
  callHideLoader: PropTypes.func.isRequired,
  /** Show toast handler */
  callShowToast: PropTypes.func.isRequired,
  /** Match parameters */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Current locale */
  locale: PropTypes.string.isRequired,
  /** List of products. */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  /** Number of products in the cart. */
  count: PropTypes.number,
  /** Total price of the cart. */
  total: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  products: [],
  count: 0,
  total: 0,
};

const Checkout = ({ products, locale }) => {
  if (products.length === 0) {
    return <Redirect to={localizePath('/cart', locale)} />;
  }
  return (
    <>
      <PageTitle
        title="Checkout"
      />
      <CheckoutForm />
    </>
  );
};

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    products: state.cart.products,
    total: state.cart.total,
    count: state.cart.count,
  }
);

export default connect(mapStateToProps, null)(Checkout);
