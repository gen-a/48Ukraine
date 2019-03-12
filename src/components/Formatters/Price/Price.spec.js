/**
 * Snapshot test for Price Component.
 * Placeholder fot the description
 * @module Price.spec
 */
import React from 'react';
import Price from './Price';

describe('Test for Price component', () => {
  const props = {};

  it ('Price from render', () => {
    const wrapper = shallow(<Price {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
