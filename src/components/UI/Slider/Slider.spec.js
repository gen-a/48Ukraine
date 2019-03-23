/**
 * Snapshot test for Slider Component.
 * Placeholder fot the description
 * @module Slider.spec
 */
import React from 'react';
import Slider from './Slider';

describe('Test for Slider component', () => {
  const props = {};

  it ('Slider from render', () => {
    const wrapper = shallow(<Slider {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
