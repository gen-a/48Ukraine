/**
 * SystemMessage message Component.
 * Show small messages to the visitor
 * @module SystemMessage
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideSystemMessage } from '../../../actions/app';
import { APP_ROOT } from '../../../config/app';
import IconClose from '../../Svg/IconClose';
import Icon from '../Icon';


import './SystemMessage.scss';

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
  /* Function to hide SystemMessage */
  onHideSystemMessage: PropTypes.func,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  type: 'error',
  isVisible: false,
  duration: 2000,
  onHideSystemMessage: () => console.log('onHideSystemMessage'),
};


const SystemMessage = ({ body, title, type, isVisible, onHideSystemMessage }) => {
  let className = 'SystemMessage';
  if (isVisible) {
    className += ' SystemMessage_isVisible';
  }
  if (type) {
    className += ` SystemMessage_${type}`;
  }

  return ReactDOM.createPortal(
    (
      <div className={className}>
        <div className="SystemMessage__scrim" onClick={() => onHideSystemMessage()}/>
        <div className="SystemMessage__window">
          <div className="SystemMessage__header">
            <div className="SystemMessage__title">
              {title}
            </div>
            <button type="button" className="SystemMessage__closeButton" onClick={() => onHideSystemMessage()}>
              <Icon size={32} svg={ <IconClose /> } />
            </button>
          </div>
          <div className="SystemMessage__body">
            {body}
          </div>
        </div>
      </div>
    ),
    APP_ROOT
  );
};


SystemMessage.propTypes = propTypes;
SystemMessage.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    isVisible: state.app.systemMessage.isActive,
    body: state.app.systemMessage.body,
    type: state.app.systemMessage.type,
    title: state.app.systemMessage.title
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHideSystemMessage: () => dispatch(hideSystemMessage())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemMessage);


