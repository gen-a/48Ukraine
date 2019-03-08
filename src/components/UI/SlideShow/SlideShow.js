/**
 * SlideShow Component.
 * Placeholder fot the description
 * @module SlideShow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconKeysLeftRight from '../../Svg/IconKeysLeftRight';
import './SlideShow.scss';
import Slide from './Slide/Slide';

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
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  autoPlay: false,
  delay: 2000,
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
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
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
    const { delay } = this.props;
    this.interval = setInterval(() => this.next(), delay);
  }

  /**
   * Stop autoPlay
   */
  stop() {
    clearInterval(this.interval);
  }

  /**
   * Go to next slide
   */
  next() {
    const { current, length } = this.state;
    this.goTo(current === length - 1 ? 0 : current + 1);
  }

  /**
   * Go to previous slide
   */
  prev() {
    const { current, length } = this.state;
    this.goTo(current === 0 ? length - 1 : current - 1);
  }

  /**
   * Go to N slide
   */
  goTo(n) {
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
        >
          <div className="SlideShow__container">
            {children.map((slide, index) => <Slide key={index} isCurrent={current === index}>{slide}</Slide>)}
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
      </div>
    );
  }
}

SlideShow.propTypes = propTypes;
SlideShow.defaultProps = defaultProps;

export default SlideShow;
