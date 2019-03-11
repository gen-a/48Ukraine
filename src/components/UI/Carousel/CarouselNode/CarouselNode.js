/**
 * CarouselNode Component.
 * Data container for Carousel slots
 * @module Iterable
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Unique key of the element. */
  id: PropTypes.string.isRequired,
  /** Anything that can be rendered as a children. */
  children: PropTypes.node.isRequired,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const CarouselNode = ({ children, id }) => <div key={id}>{children}</div>;

CarouselNode.propTypes = propTypes;

export default CarouselNode;
