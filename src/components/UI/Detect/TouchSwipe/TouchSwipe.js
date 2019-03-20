/**
 * TouchSwipe React component. Detects swipe by touch activity.
 * When swipe it detected it call onSwipe function with data object argument as follows
 * {direction, xDistance, yDistance, distance, time, speed}
 * @module TouchSwipe
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Touch motion distance to be detected as swipe. */
  swipeDistance: PropTypes.number,
  /** Touch motion time to be detected as swipe. */
  swipeTime: PropTypes.number,
  /** On swipe function to dispatch swipe with object. */
  onSwipe: PropTypes.func,
  /** Children elemEnt to be rendered inside the component. */
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
 * Blocking swipe detect of parents TouchSwipe.
 * @type {boolean}
 */
let lockTouchSwipe = false;

/**
 * Class of the TouchSwipe component.
 * @extends Component
 */
class TouchSwipe extends Component {
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
    this.touchData = {
      timer: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    };
    this.detect = false;
  }

  /**
   * Start detect motion if touches length array is 1
   * @param touches {Array}
   */
  onTouchStart(touches) {
    if (touches.length === 1) {
      this.onStart(touches[0].clientX, touches[0].clientY);
    } else {
      this.onEnd();
    }
  }

  /**
   * End or start detect motion depending on number of the touches
   * @param touches {Array}
   */
  onTouchEnd(touches) {
    this.onEnd();
  }

  /**
   * Collect on move touch data
   * @param touches {Array}
   */
  onTouchMove(touches) {
    this.onMove(touches[0].clientX, touches[0].clientY);
  }

  /**
   * Initialize touch data on start.
   * @param x {number} - Starting x coordinate of touch
   * @param y {number} - Starting y coordinate of touch
   */
  onStart(x, y) {
    if (!lockTouchSwipe) {
      lockTouchSwipe = true;
      this.touchData = {
        timer: new Date().getTime(),
        endY: y,
        startY: y,
        endX: x,
        startX: x
      };
      this.detect = true;
    }
  }

  /**
   * Storing on touch motion x and y coordinates.
   * @param x {number} - Starting x coordinate of touch
   * @param y {number} - Starting y coordinate of touch
   */
  onMove(x, y) {
    this.touchData.endY = y;
    this.touchData.endX = x;
  }

  /**
   * Calculate swipe against collected data and call onSwipe props function when detected.
   */
  onEnd() {
    lockTouchSwipe = false;
    this.detect = false;
    const { swipeDistance, swipeTime } = this.props;
    const {
      timer, startX, startY, endX, endY
    } = this.touchData;
    const time = new Date().getTime() - timer;
    const xDistance = endX - startX;
    const yDistance = endY - startY;
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    const speed = distance / time;

    if (distance > swipeDistance && swipeTime > time) {
      const direction = TouchSwipe.detectSwipeDirection(xDistance, yDistance);
      this.props.onSwipe({
        direction, xDistance, yDistance, distance, time, speed
      });
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
      <span
        style={{ width: 'fit-content', height: 'fit-content' }}
        onTouchStart={e => this.onTouchStart(e.touches)}
        onTouchEnd={e => this.onTouchEnd(e.touches)}
        onTouchMove={e => this.onTouchMove(e.touches)}
      >
        {children}
      </span>
    );
  }
}

TouchSwipe.propTypes = propTypes;
TouchSwipe.defaultProps = defaultProps;

export default TouchSwipe;
