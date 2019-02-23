/**
 * Custom scroll for overflowed contents
 * @module ScrollBox
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './ScrollBox.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {};

class ScrollBox extends Component {
  constructor(props) {
    super(props);
    this.box = createRef();
    this.state = {
      topSliderRequired: false,
      leftSliderRequired: false,
      mouseIsOver: false,
      style: {}
    };
  }

  onComponentDidMount() {

  }

  initSliders() {
    const box = this.box.current;
    const { sliderSize, cursorMinSize, sliderMargin } = this.props;
    const state = {};

    state.topSliderRequired = box.clientHeight < box.scrollHeight;
    state.leftSliderRequired = box.clientWidth < box.scrollWidth;

    state.topSliderHeight = (state.leftSliderRequired ? box.clientHeight - sliderSize : box.clientHeight) - sliderMargin * 2;
    state.topSliderCursorHeight = cursorMinSize + ( state.topSliderHeight - cursorMinSize ) * (box.clientHeight / box.scrollHeight);

    state.leftSliderWidth = (state.topSliderRequired ? box.clientWidth - sliderSize : box.clientWidth) - sliderMargin * 2;
    state.leftSliderCursorWidth = cursorMinSize + ( state.leftSliderWidth - cursorMinSize ) * (box.clientWidth / box.scrollWidth);

    if (state.topSliderRequired) {
      state.topSliderValue = box.scrollTop / (box.scrollHeight - box.clientHeight);
    }

    if (state.leftSliderRequired) {
      state.leftSliderValue = box.scrollLeft / (box.scrollWidth - box.clientWidth);
    }

    this.setState(prevState => ({
      ...prevState,
      ...state
    }));
  }

  onTouchStart() {
    this.setState(prevState => ({
      ...prevState,
      style: {
        ...prevState.style,
        overflow: 'auto'
      }
    }));
  }

  onTouchEnd() {
    this.setState(prevState => ({
      ...prevState,
      style: {
        ...prevState.style,
        overflow: 'hidden'
      }
    }));
  }

  onMouseEnter() {
    this.initSliders();
    this.setState(prevState => ({
      ...prevState,
      mouseIsOver: true
    }));
  }

  onMouseLeave() {
    this.setState(prevState => ({
      ...prevState,
      mouseIsOver: false
    }));
  }

  onWheel(deltaY) {
    const box = this.box.current;
    const { wheelScrollStep } = this.props;

    if (deltaY > 0) {
      this.setTopScrollValue(box.scrollTop + wheelScrollStep);
    } else {
      if (deltaY < 0) {
        this.setTopScrollValue(box.scrollTop - wheelScrollStep);
      }
    }
  }

  setTopScrollValue(rawValue) {
    const box = this.box.current;
    this.setState(prevState => ({
      ...prevState,
      topScrollValue: Math.min(Math.max(0, rawValue), box.scrollHeight - box.clientHeight)
    }));
  }

  setLeftScrollValue(rawValue) {
    const box = this.box.current;
    this.setState(prevState => ({
      ...prevState,
      leftScrollValue: Math.min(Math.max(0, rawValue), box.scrollWidth - box.clientWidth)
    }));
  }


  render() {
    const { children } = this.props;
    const { style } = this.state;

    return (
      <div className="ScrollBox">
        <div
          className="ScrollBox__box"

          onTouchStart={() => this.onTouchStart}
          onTouchEnd={() => this.onTouchEnd}
          onMouseEnter={() => this.onMouseEnter}
          onMouseLeave={() => this.onMouseLeave}
          onWheel={(e) => {
            e.preventDefault();
            this.onWheel(e.deltaY);
          }}

          style={style}
          ref={this.box}
        >
          {children}
        </div>
      </div>
    );
  }
}


ScrollBox.propTypes = propTypes;

export default ScrollBox;
