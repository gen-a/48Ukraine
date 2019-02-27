/**
 * Snapshot test for AuthenticationForm Component.
 * Placeholder fot the description
 * @module AuthenticationForm.spec
 */
import React from 'react';
import AuthenticationForm from './AuthenticationForm';

describe('Test for AuthenticationForm component', () => {
  const props = {};

  it ('AuthenticationForm from render', () => {
    const wrapper = shallow(<AuthenticationForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
