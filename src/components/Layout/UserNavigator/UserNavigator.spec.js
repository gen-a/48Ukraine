/**
 * Snapshot test for UserNavigator Component.
 * Placeholder fot the description
 * @module UserNavigator.spec
 */
import React from 'react';
import UserNavigator from './UserNavigator';

describe('Test for UserNavigator component', () => {
  const props = {};

  it ('UserNavigator from render', () => {
    const wrapper = shallow(<UserNavigator {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
