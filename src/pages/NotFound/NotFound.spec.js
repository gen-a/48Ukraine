/**
 * Snapshot test for NotFound Component.
 * Placeholder fot the description
 * @module NotFound.spec
 */
import React from 'react';
import NotFound from './NotFound';

describe('Test for NotFound component', () => {
  const props = {};

  it ('NotFound from render', () => {
    const wrapper = shallow(<NotFound {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
