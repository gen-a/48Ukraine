/**
 * Scrim Component.
 * Call onChange function
 * @module Scrim
 */
import React from 'react';
import PropTypes from 'prop-types';

import './Scrim.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Visbility status. */
  isVisible: PropTypes.bool,
  /** On click handler. */
  onClick: PropTypes.func,
  /** Z-index. */
  depth: PropTypes.number,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  isVisible: false,
  depth: 30,
  onClick: () => {},
};

const Scrim = ({ isVisible, onClick, depth }) => (
  <div
    className={`Scrim ${isVisible ? 'Scrim_isVisible' : ''}`}
    style={{ zIndex: depth }}
    onClick={e => onClick(e)}
  />
);

Scrim.propTypes = propTypes;
Scrim.defaultProps = defaultProps;

export default Scrim;
