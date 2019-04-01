import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutForm from '../../components/Forms/Checkout';
import PageTitle from '../../components/PageTitle';
import { localizePath } from '../../localization/index';
import { Redirect } from 'react-router-dom';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
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
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  products: [],
};

const Checkout = ({ products, locale }) => {
  if (products.length === 0) {
    return (
      <Redirect to={localizePath('/', locale)} />);
  }
  return (
    <>
      <PageTitle
        title="Здійснення замовлення"
        description="Для здійснення замовлення, будьласка, заповніть всі обов'язкові поля та натисніть кнопку 'Замовити'."
      />
      <CheckoutForm/>
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
    count: state.cart.count
  }
);

export default connect(mapStateToProps, null)(Checkout);
