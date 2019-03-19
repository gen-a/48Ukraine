/**
 * Snapshot test for ProductsPromo Component.
 * Placeholder fot the description
 * @module ProductsPromo.spec
 */
import React from 'react';
import ProductsPromo from './ProductsPromo';

describe('Test for ProductsPromo component', () => {
  const props = {};

  it ('ProductsPromo from render', () => {
    const wrapper = shallow(<ProductsPromo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
