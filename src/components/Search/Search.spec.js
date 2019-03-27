/**
 * Snapshot test for Search Component.
 * Placeholder fot the description
 * @module Search.spec
 */
import React from 'react';
import Search from './Search';

describe('Test for Search component', () => {
  const props = {};

  it ('Search from render', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
