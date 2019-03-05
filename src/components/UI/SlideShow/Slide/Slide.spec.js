/**
 * Snapshot test for Slide Component.
 * Placeholder fot the description
 * @module Slide.spec
 */
import React from 'react';
import Slide from './Slide';

describe('Test for Slide component', () => {
  const props = {};

  it ('Slide from render', () => {
    const wrapper = shallow(<Slide {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
