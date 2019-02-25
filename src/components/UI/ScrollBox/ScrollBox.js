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
    this.root = createRef();
    this.state = {
      slider: {
        isVisible: false,
        value: 0,
        cursorHeight: 0,
        height: 0,
        max: 0,
      },
    };
    this.interval = 0;
    this.scrollHeight = 0;
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.stopWatchClientHeight = this.stopWatchClientHeight.bind(this);
  }

  /**
   * Add mouse enter event listener for clientHeight watching
   */
  componentDidMount() {
    this.addMouseEnterListener();
  }

  /**
   * Initialise after component did mount
   */
  componentWillUnmount() {
    this.stopWatchClientHeight();
  }

  /**
   * Remove mouse event listeners and set overflow to auto
   */
  onTouchStart() {
    this.box.current.style.overflow = 'auto';
    this.removeMouseEnterListener();
  }

  /**
   * On timeout add mouse event listeners and set overflow to hidden
   * Timeout for ignoring MouseEnter event emitted by TouchEnd
   */
  onTouchEnd() {
    setTimeout(() => {
      this.box.current.style.overflow = 'hidden';
      this.addMouseEnterListener();
    }, 10);
  }

  /**
   * Start watching and initialize scroll
   */
  onMouseEnter(){
    this.startWatchClientHeight();
  }

  /**
   * Scroll by offset new slider cursor value
   * Set box scrollTop and update state.scroll.value
   * @param newValue {number} - value in range of 0 - 1
   */
  onChangeScrollValue(newValue) {
    const value = Math.max(0, Math.min(1, newValue));
    const box = this.box.current;
    const { slider: { max } } = this.state;
    box.scrollTop = max * value;
    this.setState(prevState => ({
      ...prevState,
      slider: {
        ...prevState.slider,
        value
      }
    }));
  }

  /**
   * Scroll by client height up/down.
   * @param direction {number} - integer to define the direction of scrolling
   */
  onChangePageScrollValue(direction) {
    const box = this.box.current;
    const { slider: { max } } = this.state;
    this.onChangeScrollValue((box.scrollTop + (box.clientHeight + 10) * direction) / max);
  }

  /**
   * Handle scroll on mouse wheel event
   * @param deltaY {number} - integer to define the direction of scrolling
   */
  onWheel(deltaY) {
    const box = this.box.current;
    const { wheelScrollStep } = this.props;
    const { slider: { max } } = this.state;
    this.onChangeScrollValue((box.scrollTop + wheelScrollStep * (deltaY > 0 ? 1 : -1)) / max);
  }

  /**
   * Add Mouse Events listeners
   */
  addMouseEnterListener() {
    this.root.current.addEventListener('mouseenter', this.onMouseEnter, false);
    this.root.current.addEventListener('mouseleave', this.stopWatchClientHeight, false);
  }

  /**
   * Remove Mouse Events listeners
   */
  removeMouseEnterListener() {
    this.stopWatchClientHeight();
    this.root.current.removeEventListener('mouseenter', this.onMouseEnter, false);
    this.root.current.removeEventListener('mouseleave', this.stopWatchClientHeight, false);
  }

  /**
   * Set interval to watch scrollHeight change to call initSlider method
   */
  startWatchClientHeight() {
    this.initSlider();
    this.interval = setInterval(() => {
      const { current: { scrollHeight } } = this.box;
      if (scrollHeight !== this.scrollHeight) {
        this.initSlider();
        this.scrollHeight = scrollHeight;
      }
    }, 100);
  }

  /**
   * Stop watcher and se scroll to invisible
   */
  stopWatchClientHeight() {
    this.setState(prevState => ({
      ...prevState,
      slider: {
        ...prevState.slider,
        isVisible: false
      }
    }));
    clearInterval(this.interval);
  }

  /**
   * Initialize scroll box sizes
   */
  initSlider() {
    const slider = {};
    const box = this.box.current;
    const { sliderMargin, cursorMinSize } = this.props;
    slider.max = box.scrollHeight - box.clientHeight;
    slider.isVisible = slider.max > 0;
    if (slider.isVisible) {
      slider.value = box.scrollTop / slider.max;
      slider.height = box.clientHeight - sliderMargin * 2;
      slider.cursorHeight = cursorMinSize + ( slider.height - cursorMinSize ) * (box.clientHeight / box.scrollHeight);
    }
    this.setState(prevState => ({
      ...prevState,
      slider: {
        ...prevState.slider,
        ...slider
      }
    }));
  }

  /**
   * Render visual presentation
   * @returns {XML}
   */
  render() {
    const { children, sliderSize, sliderMargin } = this.props;
    const { slider: { isVisible, value, height, cursorHeight } } = this.state;
    const boxStyle = {
      overflow: 'hidden',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: isVisible ? `${sliderSize + sliderMargin * 2}px` : 0
    };
    return (
      <div
        className="ScrollBox"
        ref={this.root}
      >
        <div
          className="ScrollBox__box"
          onWheel={(e) => {
            e.preventDefault();
            this.onWheel(e.deltaY);
          }}
          onTouchStart={() => this.onTouchStart()}
          onTouchEnd={() => this.onTouchEnd()}

          style={boxStyle}
          ref={this.box}
        >
          {children}
        </div>
        {isVisible
        && (
          <VerticalSlider
            barHeight={height}
            cursorHeight={cursorHeight}
            cursorTop={value * ( height - cursorHeight )}
            onChange={(newValue) => this.onChangeScrollValue(newValue)}
            onPageChange={(direction) => this.onChangePageScrollValue(direction)}
          />
        )}
      </div>
    );
  }
}

ScrollBox.defaultProps = defaultProps;
ScrollBox.propTypes = propTypes;

export default ScrollBox;
