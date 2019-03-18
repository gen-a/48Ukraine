/**
 * Snapshot test for OrdersList Component.
 * Placeholder fot the description
 * @module OrdersList.spec
 */
import React from 'react';
import OrdersList from './OrdersList';

describe('Test for OrdersList component', () => {
  const props = {};

  it ('OrdersList from render', () => {
    const wrapper = shallow(<OrdersList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
