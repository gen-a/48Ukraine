/**
 * Group Component.
 * Placeholder fot the description
 * @module Group
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Children to be animated. */
  children: PropTypes.node.isRequired,
  /** ID of the slides group. */
  name: PropTypes.string.isRequired,
  /** Width for AspectRatio box. */
  width: PropTypes.number.isRequired,
  /** Height for AspectRatio box. */
  height: PropTypes.number.isRequired,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Group = ({ children, name, width, height }) => children;

Group.propTypes = propTypes;

export default Group;
