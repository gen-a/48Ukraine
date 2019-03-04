/**
 * Snapshot test for FlashMessages Component.
 * Placeholder fot the description
 * @module FlashMessages.spec
 */
import React from 'react';
import FlashMessages from './FlashMessages';

describe('Test for FlashMessages component', () => {
  const props = {};

  it ('FlashMessages from render', () => {
    const wrapper = shallow(<FlashMessages {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
