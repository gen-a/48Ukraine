/**
 * Custom scroll for overflowed contents
 * @module Carousel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElementResize from '../Detect/ElementResize';

import CarouselIconChevronLeft from './CarouselIconChevronLeft';

import styles from './Carousel.scss';
import MouseMotion from '../Detect/MouseMotion/MouseMotion';
import TouchMotion from '../Detect/TouchMotion/TouchMotion';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Renderable content  */
  children: PropTypes.node.isRequired,
  /** Width of the children node slot.  */
  slotWidth: PropTypes.number,
  /** Start drag handler for controlling events by parent container.  */
  onStartDrag: PropTypes.func,
  /** End drag handler for controlling events by parent container.  */
  onEndDrag: PropTypes.func,
};

/**
 * Default settings of the component
 * @type {object}
 */
const defaultProps = {
  slotWidth: 200,
  onStartDrag: () => {
    console.log('disableEvents');
  },
  onEndDrag: () => {
    console.log('enableEvents');
  },
};

/**
 * Carousel Main Component class
 */
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: {
        width: 0,
        left: 0
      },
      container: {
        width: 0,
        translateX: 0,
      },
      scroll: {
        min: 0,
        max: 0
      }
    };
    this.startTranslateX = 0;
    this.timeOut = 0;
    this.blockEvents = false;
    this.touchMotionInProgress = false;
    this.startX = 0;
    this.buttonWidth = parseInt(styles.buttonWidth, 10);
  }

  /**
   * Initialise dimensions on resize element
   * @param width
   */
  onElementResize({ width }) {
    const { children: { length }, slotWidth } = this.props;
    const contentWidth = slotWidth * length;
    const withButton = contentWidth > width;
    const frameWidth = withButton ? width - this.buttonWidth * 2 : width;
    const frameLeft = withButton ? this.buttonWidth : 0;

    this.setState(prevState => ({
      ...prevState,
      frame: {
        ...prevState.frame,
        width: frameWidth,
        left: frameLeft
      },
      container: {
        ...prevState.container,
        width: contentWidth,
        translateX: Math.min(0,
          Math.max(
            prevState.container.translateX,
            frameWidth - contentWidth
          )),
        transition: '0.4s all'
      },
      scroll: {
        min: frameWidth - contentWidth,
        max: 0
      }
    }));
  }

  /**
   * Start mouse motion handler
   */
  onStartMouseMotion(e) {
    this.startX = e.start.x;
    this.startMotion();
  }

  /**
   * Start touch motion handler
   */
  onStartTouchMotion(e) {
    if (e.points.length === 1) {
      this.touchMotionInProgress = true;
      this.startX = e.points[0].x;
    }
  }

  /**
   * End touch motion handler
   */
  onEndTouchMotion(e) {
    if (e.points.length === 1) {
      this.touchMotionInProgress = true;
      this.startX = e.points[0].x;
    } else {
      this.onEndMotion();
    }
  }

  /**
   * End motion handler
   */
  onEndMotion() {
    const { onEndDrag } = this.props;
    this.setState(prevState => ({
      ...prevState,
      container: {
        ...prevState.container,
        transition: '0.4s all'
      }
    }));
    clearTimeout(this.timeOut);
    if (this.blockEvents) {
      this.timeOut = setTimeout(onEndDrag, 20);
    }
    this.blockEvents = false;
  }


  onTouchMotion(e) {
    if (this.touchMotionInProgress) {
      this.traceMotion(e.points[0].x);
    }
  }

  onMouseMotion(e) {
    this.traceMotion(e.current.x);
  }

  /**
   * On right button click handler
   */
  onPageDown() {
    const { container: { translateX }, frame: { width } } = this.state;
    const { slotWidth } = this.props;
    const targetX = translateX + (width - (slotWidth - translateX % slotWidth));
    this.setState(prevState => ({
      ...prevState,
      container: {
        ...prevState.container,
        translateX: this.limitOffsetLeft(targetX)
      }
    }));
  }

  /**
   * On left button click handler
   */
  onPageUp() {
    const { container: { translateX }, frame: { width } } = this.state;
    const { slotWidth } = this.props;
    const targetX = translateX + translateX % slotWidth - Math.floor(width / slotWidth) * slotWidth;
    this.setState(prevState => ({
      ...prevState,
      container: {
        ...prevState.container,
        translateX: this.limitOffsetLeft(targetX)
      }
    }));
  }

  /**
   * On right button click handler
   */
  traceMotion(x) {
    const { onStartDrag } = this.props;
    const delta = x - this.startX;
    const translateX = this.limitOffsetLeft(this.startTranslateX + delta);

    if (Math.abs(delta) > 10) {
      if (!this.blockEvents) {
        onStartDrag();
      }
      this.blockEvents = true;
    }

    this.setState(prevState => ({
      ...prevState,
      container: {
        ...prevState.container,
        translateX,
        transition: 'none'
      }
    }));
  }

  /**
   * Combine className for the element
   * @param base
   * @returns {function(*, *)}
   */
  cssClassName(base) {
    return (condition, name) => condition ? `${base} ${name}` : base;
  }

  /**
   * Store start data on start motion
   */
  startMotion() {
    const { container: { translateX } } = this.state;
    this.startTranslateX = translateX;
  }

  /**
   * Limit translateX by max min rage
   * @param value
   * @returns {number}
   */
  limitOffsetLeft(value) {
    const { container: { width: contentWidth }, frame: { width: frameWidth } } = this.state;
    return Math.min(0, Math.max(value, frameWidth - contentWidth));
  }
  /**
   * Render visual presentation
   * @returns {XML}
   */
  render() {
    const { slotWidth, children } = this.props;
    const { container, frame, scroll } = this.state;
    const containerStyle = {
      transform: `translateX(${container.translateX}px)`,
      transition: container.transition,
      width: `${container.width}px`
    };
    const frameStyle = {
      width: `${frame.width}px`,
      left: `${frame.left}px`
    };
    const css = this.cssClassName;
    const leftButtonStyle = css(
      css('Carousel__button')(true, 'Carousel__button_left')
    )(container.translateX === scroll.max, 'Carousel__button_disabled');

    const rightButtonStyle = css(
      css('Carousel__button')(true, 'Carousel__button_right')
    )(container.translateX === scroll.min, 'Carousel__button_disabled');

    return (
      <div className="Carousel">
        <ElementResize onResize={e => this.onElementResize(e)}/>
        <TouchMotion
          onStart={e => this.onStartTouchMotion(e)}
          onMove={e => this.onTouchMotion(e)}
          onEnd={e => this.onEndTouchMotion(e)}
        >
          <MouseMotion
            onStart={e => this.onStartMouseMotion(e)}
            onMove={e => this.onMouseMotion(e)}
            onEnd={e => this.onEndMotion(e)}
          >
            <div
              className="Carousel__frame"
              style={frameStyle}
            >
              <div
                className="Carousel__container"
                style={containerStyle}
              >
                {children.map((element, index) => (
                  <div
                    className="Carousel__slot"
                    key={element.key}
                    style={{ width: `${slotWidth}px`, left: `${slotWidth * index}px` }}
                  >
                    {element}
                  </div>
                ))}
              </div>

            </div>
          </MouseMotion>
        </TouchMotion>

        <button className={leftButtonStyle} onClick={() => this.onPageDown()}>
          <CarouselIconChevronLeft viewBox="0 0 64 64" width="48px" height="48px" />
        </button>

        <button className={rightButtonStyle} onClick={() => this.onPageUp()}>
          <CarouselIconChevronLeft viewBox="0 0 64 64" width="48px" height="48px" />
        </button>

      </div>
    );
  }
}

Carousel.defaultProps = defaultProps;
Carousel.propTypes = propTypes;

export default Carousel;
