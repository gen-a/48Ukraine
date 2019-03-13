/**
 * Snapshot test for PriceSticker Component.
 * Placeholder fot the description
 * @module PriceSticker.spec
 */
import React from 'react';
import PriceSticker from './PriceSticker';

describe('Test for PriceSticker component', () => {
  const props = {};

  it ('PriceSticker from render', () => {
    const wrapper = shallow(<PriceSticker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
