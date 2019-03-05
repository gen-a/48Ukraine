/**
 * Snapshot test for SlideShow Component.
 * Placeholder fot the description
 * @module SlideShow.spec
 */
import React from 'react';
import SlideShow from './SlideShow';

describe('Test for SlideShow component', () => {
  const props = {};

  it ('SlideShow from render', () => {
    const wrapper = shallow(<SlideShow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
