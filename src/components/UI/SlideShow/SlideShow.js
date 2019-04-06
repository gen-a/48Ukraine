/**
 * SlideShow Component.
 * Placeholder fot the description
 * @module SlideShow
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import IconKeysLeftRight from '../../Svg/IconKeysLeftRight';
import './SlideShow.scss';
import Slide from './Slide/Slide';
import TouchSwipe from '../Events/TouchSwipe';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Children to be animated. */
  children: PropTypes.node.isRequired,
  /** Flag to start autoplay. */
  autoPlay: PropTypes.bool,
  /** Delay in milliseconds. */
  delay: PropTypes.number,
  /** Pause timeout to autoplay. */
  inactivityTimeout: PropTypes.number,
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  autoPlay: false,
  delay: 3000,
  inactivityTimeout: 5000
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class SlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: props.children.length
    };
    this.interval = 0;
    this.stopTimeout = 2000;
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.play = this.play.bind(this);
    this.swipeTarget = createRef();
  }


  /**
   * If autoPlay mode start playing
   */
  componentDidMount() {
    const { autoPlay } = this.props;
    if (autoPlay) {
      this.play();
    }
  }

  /**
   * Stop autoPlay
   */
  componentWillUnmount() {
    this.stop();
    clearTimeout(this.stopTimeout);
  }

  /**
   * On keyDown handler - stop playing and go to the next or prev
   */
  onKeyDown(e) {
    switch (e.keyCode) {
      case 37:
        this.stop();
        this.prev();
        break;
      case 39:
        this.stop();
        this.next();
        break;
      default:
    }
  }

  /**
   * On click handler - stop playing and go to the next
   */
  onSlidesClick() {
    this.stop();
    this.next();
  }

  /**
   * Start autoPlay
   */
  play() {
    clearTimeout(this.stopTimeout);
    const { delay } = this.props;
    this.interval = setInterval(() => this.next(), delay);
  }

  /**
   * Set time out of inactivity
   */
  setOnInactivityPlay() {
    clearTimeout(this.stopTimeout);
    const { autoPlay, inactivityTimeout } = this.props;
    if (autoPlay) {
      this.stopTimeout = setTimeout(() => this.play(), inactivityTimeout);
    }
  }

  /**
   * Stop autoPlay
   */
  stop() {
    this.setOnInactivityPlay();
    clearInterval(this.interval);
  }

  /**
   * Go to next slide
   */
  next() {
    this.setOnInactivityPlay();
    const { current, length } = this.state;
    this.goTo(current === length - 1 ? 0 : current + 1);
  }

  /**
   * Go to previous slide
   */
  prev() {
    this.setOnInactivityPlay();
    const { current, length } = this.state;
    this.goTo(current === 0 ? length - 1 : current - 1);
  }

  /**
   * Go to N slide
   */
  goTo(n) {
    this.setOnInactivityPlay();
    this.setState(prevState => ({
      ...prevState,
      current: n,
    }));
  }


  render() {
    const { children } = this.props;
    const { current } = this.state;

    return (
      <div className="SlideShow">
        <div
          className="SlideShow__slides"
          tabIndex="0"
          onClick={() => this.onSlidesClick()}
          onKeyDown={(e) => this.onKeyDown(e)}

          ref={this.swipeTarget}
        >
          <div className="SlideShow__container">
            {children.map((slide, index) => <Slide key={slide.props.id} isCurrent={current === index}>{slide}</Slide>)}
          </div>
          <div className="SlideShow__keysIcon">
            <IconKeysLeftRight viewBox="0 0 64 42" width="64px" height="64px"/>
          </div>
        </div>
        <div className="SlideShow__controls">
          {[...Array(children.length)].map((n, index) => (
            <button
              key={index}
              type="button"
              tabIndex="0"
              className={
                current === index
                  ? 'SlideShow__control SlideShow__control_current'
                  : 'SlideShow__control'
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.stop();
                this.goTo(index);
              }}
            />
          ))}
        </div>
        <TouchSwipe
          target={this.swipeTarget}
          onSwipe={(e) => {
            if (e.direction === 'right') {
              this.stop();
              this.prev();
            }
            if (e.direction === 'left') {
              this.stop();
              this.next();
            }
          }}
        />
      </div>
    );
  }
}

SlideShow.propTypes = propTypes;
SlideShow.defaultProps = defaultProps;

export default SlideShow;
