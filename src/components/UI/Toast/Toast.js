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
  /** Text message of the toast. */
  text: PropTypes.string,
  /** Flag to switch show/hide state */
  isVisible: PropTypes.bool,
  /** Time of showing toast in milliseconds */
  duration: PropTypes.number,
  /** Function to hide Toast */
  onHideToast: PropTypes.func,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  text: '',
  isVisible: false,
  duration: 2000,
  onHideToast: () => console.log('onHideToast'),
};


const Toast = ({ text, isVisible, duration, onHideToast }) => {
  if (isVisible) {
    setTimeout(() => {
      onHideToast();
    }, duration);
  }
  return ReactDOM.createPortal(
    (
      <div className={isVisible ? 'Toast Toast_isVisible' : 'Toast'}>
        <div className="Toast__message">
          {text}
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
    text: state.app.toast.text
  }
);

const mapDispatchToProps = dispatch => (
  {
    onHideToast: () => dispatch(hideToast())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
