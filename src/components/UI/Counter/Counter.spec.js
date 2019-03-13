/**
 * Snapshot test for Counter Component.
 * Placeholder fot the description
 * @module Counter.spec
 */
import React from 'react';
import Counter from './Counter';

describe('Test for Counter component', () => {
  const props = {};

  it ('Counter from render', () => {
    const wrapper = shallow(<Counter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
