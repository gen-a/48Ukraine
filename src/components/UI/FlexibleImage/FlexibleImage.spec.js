/**
 * Snapshot test for Image Component.
 * Placeholder fot the description
 * @module Image.spec
 */
import React from 'react';
import Image from './FlexibleImage';

describe('Test for FlexibleImage component', () => {
  const props = {};

  it ('FlexibleImage from render', () => {
    const wrapper = shallow(<Image {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
