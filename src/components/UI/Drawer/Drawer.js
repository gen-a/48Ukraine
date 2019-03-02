/**
 * Drawer Component.
 * Call onChange function
 * @module Drawer
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Drawer.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Position on the screen. */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Children tools. */
  children: PropTypes.node.isRequired,
  /** Z-index. */
  depth: PropTypes.number,
  /** Open status of the drawer. */
  isOpen: PropTypes.bool,
  /** Name of the drawer. */
  header: PropTypes.node,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  position: 'left',
  depth: 1,
  isOpen: false,
  header: ''
};

const Drawer = ({ position, children, depth, isOpen, header }) => (
  <div
    className={`Drawer Drawer_${position} ${isOpen ? 'Drawer_isOpen' : ''}`}
    style={{ zIndex: isOpen ? depth + 1 : depth }}
  >
    <div className="Drawer__header">
      {header}
    </div>
    <div className="Drawer__body">
      {children}
    </div>
  </div>
);

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;

export default Drawer;
