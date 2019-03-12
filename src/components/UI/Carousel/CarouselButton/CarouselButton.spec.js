/**
 * Snapshot test for CarouselButton Component.
 * Placeholder fot the description
 * @module CarouselButton.spec
 */
import React from 'react';
import CarouselButton from './CarouselButton';

describe('Test for CarouselButton component', () => {
  const props = {};

  it ('CarouselButton from render', () => {
    const wrapper = shallow(<CarouselButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
