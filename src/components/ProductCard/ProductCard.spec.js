/**
 * Snapshot test for ProductCard Component.
 * Placeholder fot the description
 * @module ProductCard.spec
 */
import React from 'react';
import ProductCard from './ProductCard';

describe('Test for ProductCard component', () => {
  const props = {};

  it ('ProductCard from render', () => {
    const wrapper = shallow(<ProductCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
