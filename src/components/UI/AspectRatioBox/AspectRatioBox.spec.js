/**
 * Snapshot test for AspectRatioBox Component.
 * Placeholder fot the description
 * @module AspectRatioBox.spec
 */
import React from 'react';
import AspectRatioBox from './AspectRatioBox';

describe('Test for AspectRatioBox component', () => {
  const props = {};

  it ('AspectRatioBox from render', () => {
    const wrapper = shallow(<AspectRatioBox {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
