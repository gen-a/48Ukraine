/**
 * Custom scroll for overflowed contents
 * @module ScrollBox
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import VerticalSlider from './VerticalSlider';

import './ScrollBox.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Slider  */
  sliderSize: PropTypes.number,
  /* Cursor min size  */
  cursorMinSize: PropTypes.number,
  /* Slider margin size  */
  sliderMargin: PropTypes.number,
  /* Wheel pixels per step  */
  wheelScrollStep: PropTypes.number,
  /* Renderable content  */
  children: PropTypes.node.isRequired,
};
/**
 * Default settings of the component
 * @type {object}
 */
const defaultProps = {
  sliderSize: 10,
  cursorMinSize: 10,
  sliderMargin: 5,
  wheelScrollStep: 20
};

/**
 * ScrollBox Main Component class
 */
class ScrollBox extends Component {
  constructor(props) {
    super(props);
    this.box = createRef();
    this.state = {
      topSliderIsRequired: false,
      leftSliderIsRequired: false,
      topSliderHeight: 0,
      topSliderCursorHeight: 0,
      topSliderValue: 0,
    };
    this.sizes = {};
  }

  /**
   * Initialise after component did mount
   */
  componentDidMount() {
    this.initSliders();
  }

  /**
   * Turn off hidden overflow if touch event detected
   */
  onTouchStart() {
    this.box.current.style.overflow = 'auto';
  }

  /**
   * Turn on hidden after touch is ended
   */
  onTouchEnd() {
    this.box.current.style.overflow = 'hidden';
  }

  /**
   * Perform scroll on mouse wheel event
   * @param deltaY {number} - integer to define the direction of scrolling
   */
  onWheel(deltaY) {
    const box = this.box.current;
    const { wheelScrollStep } = this.props;
    const max = box.scrollHeight - box.clientHeight;
    if (deltaY > 0) {
      this.setTopScrollValue((box.scrollTop + wheelScrollStep) / max);
    } else {
      if (deltaY < 0) {
        this.setTopScrollValue((box.scrollTop - wheelScrollStep) / max);
      }
    }
  }

  /**
   * Scroll by client height up/down.
   * @param direction {number} - integer to define the direction of scrolling
   */
  setTopScrollPage(direction){
    const box = this.box.current;
    const max = box.scrollHeight - box.clientHeight;
    this.setTopScrollValue((box.scrollTop + (box.clientHeight + 10) * direction) / max);
  }

  /**
   * Scroll top by offset slider cursor value
   * @param rawValue {float} - value in range of 0 - 1
   */
  setTopScrollValue(rawValue) {
    const value = Math.max(0, Math.min(1, rawValue));
    const box = this.box.current;
    box.scrollTop = (box.scrollHeight - box.clientHeight) * value;

    this.setState(prevState => ({
      ...prevState,
      topSliderValue: value
    }));
  }

  /**
   * Initialize scroll box sizes
   */
  initSliders() {
    const state = {};
    const box = this.box.current;
    const { sliderSize, cursorMinSize, sliderMargin } = this.props;

    state.topSliderIsRequired = box.clientHeight < box.scrollHeight;
    state.leftSliderIsRequired = false;
    state.topSliderHeight = (state.topSliderIsRequired ? box.clientHeight - sliderSize : box.clientHeight) - sliderMargin;
    state.topSliderCursorHeight = cursorMinSize + ( state.topSliderHeight - cursorMinSize ) * (box.clientHeight / box.scrollHeight);

    if (state.topSliderIsRequired) {
      state.topSliderValue = box.scrollTop / (box.scrollHeight - box.clientHeight);
    }

    this.setState(prevState => ({
      ...prevState,
      ...state
    }));
  }

  render() {
    const { children } = this.props;
    const { topSliderHeight, topSliderIsRequired, topSliderCursorHeight, topSliderValue } = this.state;

    const boxStyle = {
      overflow: 'hidden',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    };

    return (
      <div className="ScrollBox">
        <div
          className="ScrollBox__box"
          onTouchStart={() => this.onTouchStart()}
          onTouchEnd ={() => this.onTouchEnd()}
          onWheel={(e) => {
            e.preventDefault();
            this.onWheel(e.deltaY);
          }}
          style={boxStyle}
          ref={this.box}
        >
          {children}
        </div>
        {topSliderIsRequired
        && (
          <VerticalSlider
            barHeight={topSliderHeight}
            cursorHeight={topSliderCursorHeight}
            cursorTop={topSliderValue * (topSliderHeight - topSliderCursorHeight)}
            onChange={(value) => this.setTopScrollValue(value)}
            onPageChange ={(value) => this.setTopScrollPage(value)}
          />
        )}
      </div>
    );
  }
}

ScrollBox.defaultProps = defaultProps;
ScrollBox.propTypes = propTypes;

export default ScrollBox;
