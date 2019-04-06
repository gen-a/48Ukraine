/**
 * FlashMessage message Component.
 * Show small messages to the visitor
 * @module FlashMessage
 */
import React from 'react';
import PropTypes from 'prop-types';
import IconClose from '../../../Svg/IconClose';
import Icon from '../../Icon/Icon';
import SwipeDetect from '../../../../utils/events/swipe';

import './FlashMessage.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message or element for body. */
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  /** Unique id of the message. */
  id: PropTypes.string,
  /** Title on the header. */
  title: PropTypes.string,
  /** Flag for removing animation class. */
  swipeOff: PropTypes.bool,
  /** Flag for collapse placeholder animation class. */
  collapse: PropTypes.bool,
  /** Height of the message window. */
  height: PropTypes.number,
  /** Type of the message. */
  type: PropTypes.oneOf(['error', 'success', 'info']),
  /** Function to hide FlashMessage */
  remove: PropTypes.func,
};
/**
 * Default settings of the component
 * @type {object}
 */
const defaultProps = {
  id: '',
  title: 'System message',
  type: 'error',
  swipeOff: false,
  collapse: false,
  height: 130,
  remove: () => console.log('remove'),
};

const FlashMessage = ({ height, collapse, swipeOff, remove, id, body, title, type }) => {
  const transform = swipeOff ? 'translateX(350px)' : 'translateX(0)';

  const swipeDetect = new SwipeDetect();
  swipeDetect.onSwipe = (e) => {
    if (e.direction === 'right') {
      remove(id);
    }
  };

  return (
    <div
      className={`FlashMessage FlashMessage_${type}`}
      style={{
        height: `${collapse ? 0 : height + 5}px`
      }}
    >
        <div
          className="FlashMessage__window"
          style={{
            transform,
            height: `${height}px`,
            opacity: swipeOff ? 0 : 1
          }}

          onTouchStart={e => swipeDetect.start(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={e => swipeDetect.move(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={e => swipeDetect.end(e)}
        >
          <div className="FlashMessage__content">
            <div className="FlashMessage__title">
              {title}
            </div>
            <button type="button" className="FlashMessage__closeButton" onClick={() => remove(id)}>
              <Icon size={32} svg={<IconClose width="24px" height="24px" viewBox="0 0 64 64"/>}/>
            </button>
            <div className="FlashMessage__body">
              {body}
            </div>
          </div>
        </div>
    </div>
  );
};


FlashMessage.propTypes = propTypes;
FlashMessage.defaultProps = defaultProps;

export default FlashMessage;
