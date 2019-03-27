/**
 * Snapshot test for SearchForm Component.
 * Placeholder fot the description
 * @module SearchForm.spec
 */
import React from 'react';
import SearchForm from './SearchForm';

describe('Test for SearchForm component', () => {
  const props = {};

  it ('SearchForm from render', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
