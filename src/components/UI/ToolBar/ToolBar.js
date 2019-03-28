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
  depth: PropTypes.number,
  /** Visibility control. */
  isVisible: PropTypes.bool,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  position: 'topLeft',
  depth: 1,
  isVisible: false
};

const ToolBar = ({ isVisible, position, children, depth }) => (
  <div
    className={
      isVisible
        ? `ToolBar ToolBar_isVisible ToolBar_${position}`
        : `ToolBar ToolBar_${position}`
    }
    style={{zIndex: depth}}
  >
    {children}
  </div>
);

ToolBar.propTypes = propTypes;
ToolBar.defaultProps = defaultProps;

export default ToolBar;
