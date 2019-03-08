/**
 * Snapshot test for Header Component.
 * Placeholder fot the description
 * @module Header.spec
 */
import React from 'react';
import Header from './Header';

describe('Test for Header component', () => {
  const props = {};

  it ('Header from render', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
