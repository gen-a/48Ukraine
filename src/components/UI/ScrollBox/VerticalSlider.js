/**
 * Slider for custom scroll for overflowed contents
 * @module VerticalSlider
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Height of the slider bar. */
  barHeight: PropTypes.number.isRequired,
  /** Height of the slider cursor. */
  cursorHeight: PropTypes.number.isRequired,
  /** Top of the slider cursor. */
  cursorTop: PropTypes.number.isRequired,
  /** On change value handler. */
  onChange: PropTypes.func.isRequired,
  /** On change by page up/down value. */
  onPageChange: PropTypes.func.isRequired,
};

/**
 * Main VerticalSlider component class
 */
class VerticalSlider extends Component {
  /**
   * Handle on bar click event
   * @param rect {object} - Bounding rectangle of the bar element
   * @param clientY {number} - cursor Y position
   */
  onBarMouseUp(rect, clientY) {
    const { cursorTop, cursorHeight, onPageChange } = this.props;

    if (clientY - rect.top < cursorTop) {
      onPageChange(-1);
    } else {
      if (clientY - rect.top > cursorTop + cursorHeight) {
        onPageChange(1);
      }
    }
  }

  /**
   * Handle mouse move event
   * @param clientY {number} - cursor Y position
   */
  onCursorMouseDown(clientY) {
    const { barHeight, cursorHeight, cursorTop } = this.props;
    const { onChange } = this.props;

    const delta = clientY - cursorTop;
    const distance = barHeight - cursorHeight;
    const move = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const value = Math.min(Math.max(0, e.clientY - delta), distance) / distance;
      this.setState(prevState => ({
        ...prevState,
        value
      }));
      onChange(value);
    };
    const stop = (e) => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  }

  /**
   * Render function
   * @returns {XML}
   */

  render() {
    const { barHeight, cursorHeight, cursorTop } = this.props;

    return (
      <div className="VerticalSlider">
        <div
          className="VerticalSlider__bar"
          style={{ height: `${barHeight}px` }}
          onMouseUp={(e) => {
            this.onBarMouseUp(e.currentTarget.getBoundingClientRect(), e.clientY);
          }}/>
        <div
          className="VerticalSlider__cursor"
          style={{ height: `${cursorHeight}px`, top: `${cursorTop}px` }}
          onMouseDown={(e) => {
            this.onCursorMouseDown(e.clientY);
          }}
        />
      </div>
    );
  }
}


VerticalSlider.propTypes = propTypes;

export default VerticalSlider;
