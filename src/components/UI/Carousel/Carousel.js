/**
 * Custom scroll for overflowed contents
 * @module Carousel
 */
import React, { Component, createRef  } from 'react';
import PropTypes from 'prop-types';
import ElementResize from '../Detect/ElementResize';
import CarouselIconChevronLeft from './CarouselIconChevronLeft';


import './Carousel.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Slider  */
  sliderSize: PropTypes.number,
  /** Cursor min size  */
  cursorMinSize: PropTypes.number,
  /** Slider margin size  */
  sliderMargin: PropTypes.number,
  /** Wheel pixels per step  */
  wheelScrollStep: PropTypes.number,
  /** Renderable content  */
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
 * Carousel Main Component class
 */
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.container = createRef();
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

  }

  /**
   * Add mouse enter event listener for clientHeight watching
   */
  componentDidMount() {

  }

  /**
   * Initialise after component did mount
   */
  componentWillUnmount() {

  }
  onTouchStart(e){
    console.log(e);
  }
  onClick(e){
    console.log(e);
  }
  /**
   * Render visual presentation
   * @returns {XML}
   */
  render() {
    const { children } = this.props;
    const { slider: { positionX } } = this.state;
    const boxStyle = {
      transform: `translateX(${positionX}px)`,
      transition: '0.4s all'
    };

    let leftButtonStyle = 'Carousel__button Carousel__button_left';
    let rightButtonStyle = 'Carousel__button Carousel__button_right';

    return (
      <div className="Carousel">

        <button className={leftButtonStyle} onClick={() => this.onClick()} onTouchStart={() => this.onTouchStart()}>
          <CarouselIconChevronLeft />
        </button>

        <div className="Carousel__frame">
          <div className="Carousel__container" ref={this.container} style={boxStyle}>
            <ElementResize onResize={(e)=>console.log(e)} />
            {children}
          </div>
        </div>

        <button className={rightButtonStyle} onClick={() => this.onClick()} onTouchStart={() => this.onTouchStart()}>
          <CarouselIconChevronLeft />
        </button>


      </div>
    );
  }
}

Carousel.defaultProps = defaultProps;
Carousel.propTypes = propTypes;

export default Carousel;
