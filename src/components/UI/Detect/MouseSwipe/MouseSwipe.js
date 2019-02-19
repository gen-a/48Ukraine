/**
 * MouseSwipe React component. Detects swipe by touch activity.
 * When swipe it detected it call onSwipe function with data object argument as follows
 * {direction, xDistance, yDistance, distance, time, speed}
 * @module MouseSwipe
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Pointer motion distance to be detected as swipe. */
  swipeDistance: PropTypes.number,
  /* Pointer motion time to be detected as swipe. */
  swipeTime: PropTypes.number,
  /* On swipe function to dispatch swipe with object. */
  onSwipe: PropTypes.func,
  /* Children elemEnt to be rendered inside the component. */
  children: PropTypes.element.isRequired,
};
/**
 * Default settings for swipe detection.
 * @type {object}
 */
const defaultProps = {
  swipeDistance: 30,
  swipeTime: 300,
  onSwipe: console.log
};

/**
 * Blocking swipe detect of parents MouseSwipe.
 * @type {boolean}
 */
let lockPointerSwipe = false;

/**
 * Class of the MouseMouseSwipe component.
 * @extends Component
 */
class MouseSwipe extends Component {
  /**
   * Get direction string by comparing x y distances.
   * @param {number} x - The x distance value.
   * @param {number} y - The y distance value.
   * @return {string} right|left|down|up.
   * @static
   */
  static detectSwipeDirection(x, y) {
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left';
    }
    return y > 0 ? 'down' : 'up';
  }

  /**
   * Constructor of the component.
   * @param props {object}
   */
  constructor(props) {
    super(props);
    this.pointerData = {
      timer: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    };
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  /**
   * Initialize touch data on start.
   * @param e {object} - Mouse down Event Object
   */
  onStart(e) {
    if (!lockPointerSwipe) {
      lockPointerSwipe = true;
      this.pointerData = {
        timer: new Date().getTime(),
        endY: e.clientY,
        startY: e.clientY,
        endX: e.clientX,
        startX: e.clientX
      };
      window.addEventListener('mousemove', this.onMove, false);
      window.addEventListener('mouseup', this.onEnd, false);
    }
  }

  /**
   * Storing on touch motion x and y coordinates.
   * @param e {Event} - Mouse move Event Object
   */
  onMove(e) {
    this.pointerData.endY = e.clientY;
    this.pointerData.endX = e.clientX;
  }

  /**
   * Calculate swipe against collected data and call onSwipe props function when detected.
   */
  onEnd(e) {
    lockPointerSwipe = false;
    window.removeEventListener('mousemove', this.onMove, false);
    window.removeEventListener('mouseup', this.onEnd, false);

    const { swipeDistance, swipeTime } = this.props;
    const {
      timer, startX, startY, endX, endY
    } = this.pointerData;
    const time = new Date().getTime() - timer;
    const xDistance = endX - startX;
    const yDistance = endY - startY;
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    const speed = distance / time;

    if (distance > swipeDistance && swipeTime > time) {
      const direction = MouseSwipe.detectSwipeDirection(xDistance, yDistance);
      this.props.onSwipe({
        direction, xDistance, yDistance, distance, time, speed
      });
      e.preventDefault();
      window.getSelection().removeAllRanges();
    }
  }

  /**
   * Render component
   * @returns {Element}
   */

  render() {
    const { children } = this.props;
    return (
      <div
        style={{ width: 'fit-content', height: 'fit-content' }}
        onMouseDown={(e) => {
          e.preventDefault();
          this.onStart({ ...e });
        }}
      >
        {children}
      </div>
    );
  }
}

MouseSwipe.propTypes = propTypes;
MouseSwipe.defaultProps = defaultProps;

export default MouseSwipe;
