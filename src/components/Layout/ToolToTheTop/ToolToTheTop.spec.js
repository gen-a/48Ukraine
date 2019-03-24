/**
 * Snapshot test for ToolToTheTop Component.
 * Placeholder fot the description
 * @module ToolToTheTop.spec
 */
import React from 'react';
import ToolToTheTop from './ToolToTheTop';

describe('Test for ToolToTheTop component', () => {
  const props = {};

  it ('ToolToTheTop from render', () => {
    const wrapper = shallow(<ToolToTheTop {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
