/**
 * Snapshot test for Image Component.
 * Placeholder fot the description
 * @module Image.spec
 */
import React from 'react';
import Image from './Image';

describe('Test for Image component', () => {
  const props = {};

  it ('Image from render', () => {
    const wrapper = shallow(<Image {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
