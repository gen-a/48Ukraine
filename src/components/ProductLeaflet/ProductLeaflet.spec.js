/**
 * Snapshot test for ProductLeaflet Component.
 * Placeholder fot the description
 * @module ProductLeaflet.spec
 */
import React from 'react';
import ProductLeaflet from './ProductLeaflet';

describe('Test for ProductLeaflet component', () => {
  const props = {};

  it ('ProductLeaflet from render', () => {
    const wrapper = shallow(<ProductLeaflet {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
