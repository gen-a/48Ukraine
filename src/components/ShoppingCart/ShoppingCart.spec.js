/**
 * Snapshot test for ShoppingCart Component.
 * Placeholder fot the description
 * @module ShoppingCart.spec
 */
import React from 'react';
import ShoppingCart from './ShoppingCart';

describe('Test for ShoppingCart component', () => {
  const props = {};

  it ('ShoppingCart from render', () => {
    const wrapper = shallow(<ShoppingCart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
