/**
 * Snapshot test for ImageViewer Component.
 * Placeholder fot the description
 * @module ImageViewer.spec
 */
import React from 'react';
import ImageViewer from './ImageViewer';

describe('Test for ImageViewer component', () => {
  const props = {};

  it ('ImageViewer from render', () => {
    const wrapper = shallow(<ImageViewer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
