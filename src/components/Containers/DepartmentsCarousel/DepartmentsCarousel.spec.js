/**
 * Snapshot test for DepartmentsCarousel Component.
 * Placeholder fot the description
 * @module DepartmentsCarousel.spec
 */
import React from 'react';
import DepartmentsCarousel from './DepartmentsCarousel';

describe('Test for DepartmentsCarousel component', () => {
  const props = {};

  it ('DepartmentsCarousel from render', () => {
    const wrapper = shallow(<DepartmentsCarousel {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
