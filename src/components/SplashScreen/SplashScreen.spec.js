/**
 * Snapshot test for SplashScreen Component.
 * Placeholder fot the description
 * @module SplashScreen.spec
 */
import React from 'react';
import SplashScreen from './SplashScreen';

describe('Test for SplashScreen component', () => {
  const props = {};

  it ('SplashScreen from render', () => {
    const wrapper = shallow(<SplashScreen {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
