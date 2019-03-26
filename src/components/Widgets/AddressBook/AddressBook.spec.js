/**
 * Snapshot test for AddressBook Component.
 * Placeholder fot the description
 * @module AddressBook.spec
 */
import React from 'react';
import AddressBook from './AddressBook';

describe('Test for AddressBook component', () => {
  const props = {};

  it ('AddressBook from render', () => {
    const wrapper = shallow(<AddressBook {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
