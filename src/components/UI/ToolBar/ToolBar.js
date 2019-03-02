/**
 * ToolBar Component.
 * Call onChange function
 * @module ToolBar
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ToolBar.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Position on the screen. */
  position: PropTypes.oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']),
  /** Children tools . */
  children: PropTypes.node.isRequired,
  /** Z-index . */
  depth: PropTypes.number
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  position: 'topLeft',
  depth: 1,
};

const ToolBar = ({ position, children, depth }) => (
  <div className={`ToolBar ToolBar_${position}`} style={{zIndex: depth}}>
    {children}
  </div>
);

ToolBar.propTypes = propTypes;
ToolBar.defaultProps = defaultProps;

export default ToolBar;
