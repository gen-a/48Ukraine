/**
 * Snapshot test for IntroPromoCard Component.
 * Placeholder fot the description
 * @module IntroPromoCard.spec
 */
import React from 'react';
import IntroPromoCard from './IntroPromoCard';

describe('Test for IntroPromoCard component', () => {
  const props = {};

  it ('IntroPromoCard from render', () => {
    const wrapper = shallow(<IntroPromoCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
