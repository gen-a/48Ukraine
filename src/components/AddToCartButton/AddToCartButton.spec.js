/**
 * Snapshot test for AddToCartButton Component.
 * Placeholder fot the description
 * @module AddToCartButton.spec
 */
import React from 'react';
import AddToCartButton from './AddToCartButton';

describe('Test for AddToCartButton component', () => {
  const props = {};

  it ('AddToCartButton from render', () => {
    const wrapper = shallow(<AddToCartButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
