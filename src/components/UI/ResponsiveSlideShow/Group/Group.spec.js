/**
 * Snapshot test for Group Component.
 * Placeholder fot the description
 * @module Group.spec
 */
import React from 'react';
import Group from './Group';

describe('Test for Group component', () => {
  const props = {};

  it ('Group from render', () => {
    const wrapper = shallow(<Group {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
