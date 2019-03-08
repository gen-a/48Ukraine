/**
 * Snapshot test for Authentication Component.
 * Placeholder fot the description
 * @module Authentication.spec
 */
import React from 'react';
import Authentication from './';

describe('Test for Authentication component', () => {
  const props = {};

  it ('Authentication from render', () => {
    const wrapper = shallow(<Authentication {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
