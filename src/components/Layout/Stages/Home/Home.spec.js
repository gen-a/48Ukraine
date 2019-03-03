/**
 * Snapshot test for Home Component.
 * Placeholder fot the description
 * @module Home.spec
 */
import React from 'react';
import Home from './Home';

describe('Test for Home component', () => {
  const props = {};

  it ('Home from render', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
