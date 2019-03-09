/**
 * Snapshot test for ProductsList Component.
 * Placeholder fot the description
 * @module ProductsList.spec
 */
import React from 'react';
import ProductsList from './ProductsList';

describe('Test for ProductsList component', () => {
  const props = {};

  it ('ProductsList from render', () => {
    const wrapper = shallow(<ProductsList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
