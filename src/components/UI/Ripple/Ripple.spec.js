/**
 * Snapshot test for Ripple Component.
 * Placeholder fot the description
 * @module Ripple.spec
 */
import React from 'react';
import Ripple from './Ripple';

describe('Test for Ripple component', () => {
  const props = {};

  it ('Ripple from render', () => {
    const wrapper = shallow(<Ripple {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
