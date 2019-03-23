/**
 * Snapshot test for HomeSlideShow Component.
 * Placeholder fot the description
 * @module HomeSlideShow.spec
 */
import React from 'react';
import HomeSlideShow from './HomeSlideShow';

describe('Test for HomeSlideShow component', () => {
  const props = {};

  it ('HomeSlideShow from render', () => {
    const wrapper = shallow(<HomeSlideShow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
