/**
 * Snapshot test for InfinityScroll Component.
 * Placeholder fot the description
 * @module InfinityScroll.spec
 */
import React from 'react';
import InfinityScroll from './InfinityScroll';

describe('Test for InfinityScroll component', () => {
  const props = {};

  it ('InfinityScroll from render', () => {
    const wrapper = shallow(<InfinityScroll {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
