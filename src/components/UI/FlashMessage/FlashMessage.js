/**
 * FlashMessage message Component.
 * Show small messages to the visitor
 * @module FlashMessage
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideFlashMessage } from '../../../actions/app';
import { APP_ROOT } from '../../../config/app';
import IconClose from '../../Svg/IconClose';
import Icon from '../Icon';


import './FlashMessage.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Text message or element for body. */
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  /* Title on the header. */
  title: PropTypes.string,
  /* Flag to switch show/hide state. */
  isVisible: PropTypes.bool,
  /* Type of the message. */
  type: PropTypes.oneOf(['error', 'success', 'info']),
  /* Function to hide FlashMessage */
  onHideFlashMessage: PropTypes.func,
};
/**
 * Default settings of the component
 * @type {object}
 */
const defaultProps = {
  type: 'error',
  isVisible: false,
  duration: 2000,
  onHideFlashMessage: () => console.log('onHideFlashMessage'),
};


const FlashMessage = ({ body, title, type, isVisible, onHideFlashMessage }) => {
  let className = 'FlashMessage';
  if (isVisible) {
    className += ' FlashMessage_isVisible';
  }
  if (type) {
    className += ` FlashMessage_${type}`;
  }

  return ReactDOM.createPortal(
    (
      <div className={className}>
        <div className="FlashMessage__scrim" onClick={() => onHideFlashMessage()}/>
        <div className="FlashMessage__window">
          <div className="FlashMessage__header">
            <div className="FlashMessage__title">
              {title}
            </div>
            <button type="button" className="FlashMessage__closeButton" onClick={() => onHideFlashMessage()}>
              <Icon size={32} svg={<IconClose/>}/>
            </button>
          </div>
          <div className="FlashMessage__body">
            {body}
          </div>
        </div>
      </div>
    ),
    APP_ROOT
  );
};


FlashMessage.propTypes = propTypes;
FlashMessage.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    isVisible: state.app.flashMessage.isActive,
    body: state.app.flashMessage.body,
    type: state.app.flashMessage.type,
    title: state.app.flashMessage.title
  }
);

const mapDispatchToProps = dispatch => (
  {
    onHideFlashMessage: () => dispatch(hideFlashMessage())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
