/**
 * Snapshot test for Button Component.
 * Placeholder fot the description
 * @module Button.spec
 */
import React from 'react';
import Button from './Button';

describe('Test for Button component', () => {
  const props = {};

  it ('Button from render', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
