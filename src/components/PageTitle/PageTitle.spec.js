/**
 * Snapshot test for PageTitle Component.
 * Placeholder fot the description
 * @module PageTitle.spec
 */
import React from 'react';
import PageTitle from './PageTitle';

describe('Test for PageTitle component', () => {
  const props = {};

  it ('PageTitle from render', () => {
    const wrapper = shallow(<PageTitle {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
