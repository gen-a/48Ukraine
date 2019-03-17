/**
 * Loader Component.
 * Show loader indicator on communication or data calculating
 * @module Loader
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { APP_ROOT } from '../../../config/app';

import './Loader.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Flag to switch show/hide state. */
  isVisible: PropTypes.bool,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  isVisible: false,
};

const Loader = ({ isVisible }) => {
  const className = isVisible ? 'Loader Loader_isVisible' : 'Loader';
  return ReactDOM.createPortal(
    (
      <div className={className}>
        <div className="Loader__background"/>
        <div className="Loader__indicator">
          <svg className="Loader__indicatorCircle" viewBox="25 25 50 50">
            <circle
              className="Loader__indicatorPath"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="3"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    ),
    APP_ROOT
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;


export default Loader;
