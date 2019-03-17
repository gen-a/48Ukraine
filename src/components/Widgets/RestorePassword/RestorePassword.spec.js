/**
 * Snapshot test for RestorePassword Component.
 * Placeholder fot the description
 * @module RestorePassword.spec
 */
import React from 'react';
import RestorePassword from './RestorePassword';

describe('Test for RestorePassword component', () => {
  const props = {};

  it ('RestorePassword from render', () => {
    const wrapper = shallow(<RestorePassword {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
