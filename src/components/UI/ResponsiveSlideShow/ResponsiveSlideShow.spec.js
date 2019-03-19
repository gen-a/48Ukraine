/**
 * Snapshot test for ResponsiveSlideShow Component.
 * Placeholder fot the description
 * @module ResponsiveSlideShow.spec
 */
import React from 'react';
import ResponsiveSlideShow from './ResponsiveSlideShow';

describe('Test for ResponsiveSlideShow component', () => {
  const props = {};

  it ('ResponsiveSlideShow from render', () => {
    const wrapper = shallow(<ResponsiveSlideShow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
