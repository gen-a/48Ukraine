/**
 * Snapshot test for IntroPromo Component.
 * Placeholder fot the description
 * @module IntroPromo.spec
 */
import React from 'react';
import IntroPromo from './IntroPromo';

describe('Test for IntroPromo component', () => {
  const props = {};

  it ('IntroPromo from render', () => {
    const wrapper = shallow(<IntroPromo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
