/**
 * Snapshot test for ElementResize Component.
 * Placeholder fot the description
 * @module ElementResize.spec
 */
import React from 'react';
import ElementResize from './ElementResize';

describe('Test for ElementResize component', () => {
  const props = {};

  it ('ElementResize from render', () => {
    const wrapper = shallow(<ElementResize {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
