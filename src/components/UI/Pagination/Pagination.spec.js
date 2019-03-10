/**
 * Snapshot test for Pagination Component.
 * Placeholder fot the description
 * @module Pagination.spec
 */
import React from 'react';
import Pagination from './Pagination';

describe('Test for Pagination component', () => {
  const props = {};

  it ('Pagination from render', () => {
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
