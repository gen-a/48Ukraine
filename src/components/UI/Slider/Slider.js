/**
 * Slider Component.
 * Placeholder fot the description
 * @module Slider
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '../../Svg/ChevronLeft';
import styles from './Slider.scss';
import SwipeDetect from '../../../utils/events/swipe-detect';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Slider = ({ children }) => {
  const [current, setCurrent] = useState(0);

  const transform = `translateX(-${current * parseInt(styles.slotWidth, 10)}px)`;
  const max = children.length - parseInt(styles.slotsInViewer, 10);


  const swipeDetect = new SwipeDetect();
  swipeDetect.onSwipe = (e) => {
    if (e.direction === 'right') {
      setCurrent(Math.max(current - 1, 0));
    }
    if (e.direction === 'left') {
      setCurrent(Math.min(current + 1, max));
    }
  };

  const goSlideByWheel = (e) => {
    if (e.deltaY < 0) {
      setCurrent(Math.max(current - 1, 0));
    } else {
      setCurrent(Math.min(current + 1, max));
    }
  };


  return (

    <div
      className="Slider"
      onWheel={(e) => {
        e.stopPropagation();
        e.preventDefault();
        goSlideByWheel(e);
      }}
    >
      <button
        className="Slider__button"
        onClick={() => {
          setCurrent(Math.max(current - 1, 0));
        }}
        disabled={current === 0}
      >
        <ChevronLeft/>
      </button>

      <div
        className="Slider__viewer"

        onTouchStart={e => swipeDetect.start(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={e => swipeDetect.move(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={e => swipeDetect.end(e)}

      >
        <div className="Slider__slots" style={{ transform }}>
          {children.map(c => {
            return (
              <div className="Slider__slot" key={c.props.id}>{c}</div>
            );
          })}
        </div>
      </div>

      <button
        className="Slider__button Slider__button_right"
        onClick={() => {
          setCurrent(Math.min(current + 1, max));
        }}
        disabled={current === max}
      >
        <ChevronLeft/>
      </button>
    </div>

  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
