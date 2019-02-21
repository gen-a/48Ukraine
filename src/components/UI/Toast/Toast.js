/**
 * Toast message Component.
 * Show small messages to the visitor
 * @module Toast
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideToast } from '../../../actions/app';
import { APP_ROOT } from '../../../config/app';

import './Toast.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Text message of the toast. */
  message: PropTypes.string.isRequired,
  /* Flag to switch show/hide state */
  isVisible: PropTypes.bool,
  /* Time of showing toast in milliseconds */
  duration: PropTypes.number,
  /* Function to hide Toast */
  onHideToast: PropTypes.func,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  isVisible: false,
  duration: 2000,
  onHideToast: () => console.log('onHideToast'),
};


const Toast = ({ message, isVisible, duration, onHideToast }) => {
  if (isVisible) {
    setTimeout(() => {
      onHideToast();
    }, duration);
  }
  return ReactDOM.createPortal(
    (
      <div className={isVisible ? 'Toast Toast_isVisible' : 'Toast'}>
        <div className="Toast__message">
          {message}
        </div>
      </div>
    ),
    APP_ROOT
  );
};

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    isVisible: state.app.toast.isActive,
    message: state.app.toast.message
  }
);

const mapDispatchToProps = dispatch => (
  {
    onHideToast: () => dispatch(hideToast())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
