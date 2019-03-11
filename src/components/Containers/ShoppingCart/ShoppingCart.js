/**
 * ShoppingCart Component.
 * Placeholder fot the description
 * @module ShoppingCart
 */
import React from 'react';
import { connect } from 'react-redux';
import ShoppingCart from '../../ShoppingCart';

const mapStateToProps = state => (
  {
    products: state.cart.products,
    total: state.cart.total,
    count: state.cart.count,
  }
);

export default connect(mapStateToProps, null)(ShoppingCart);
