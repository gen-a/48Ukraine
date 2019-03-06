/**
 * Slide Component.
 * Placeholder fot the description
 * @module Slide
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import './Slide.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Flag if the slide is current. */
  isCurrent: PropTypes.bool,
  /** React element to be wrapped. */
  children: PropTypes.element.isRequired,
  /** CSS style for slide out. */
  style: stylePropType,
  /** CSS style for slide in(current). */
  styleCurrent: stylePropType,
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  isCurrent: false,
  style: {
    opacity: 0,
    transform: 'scale(2)',
    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
  },
  styleCurrent: {
    opacity: 1,
    transform: 'scale(1)'
  },
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class Slide extends Component {
  /**
   * Create duplacate node with copied selected style rules
   * @param element {Element} - source node to duplicate
   * @param keys {Array} - array of the style rule names to be copied
   * @returns {Node}
   */
  static copyElementWithStyle(element, keys) {
    const duplicate = element.cloneNode(true);
    const computed = window.getComputedStyle(element);
    keys.forEach(key => duplicate.style.setProperty(
      key,
      computed.getPropertyValue(key),
      computed.getPropertyPriority(key)
    ));
    return duplicate;
  }

  /**
   * Apply style rules to the Element
   * @param element {Element}
   * @param style
   */
  static applyStyle(element, style) {
    Object.keys(style).forEach((key) => {
      element.style.setProperty(key, style[key],'');
    });
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.slide = createRef();
  }

  /**
   * Add to DOM and render slide out element if required
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const { isCurrent: nowIsCurrent, style, styleCurrent } = this.props;
    const { isCurrent: beforeIsCurrent } = prevProps;
    // check if in previous props element was current
    if (!nowIsCurrent && nowIsCurrent !== beforeIsCurrent) {
      const { current: slide } = this.slide;
      // create element attach to DOM
      const slideOut = Slide.copyElementWithStyle(slide, Object.keys(styleCurrent));
      Slide.applyStyle(slideOut, style);
      // set timeout for removal
      setTimeout(() => slide.parentNode.removeChild(slideOut), 1000);
      slide.parentNode.appendChild(slideOut);
    }
  }

  render() {
    const { children, isCurrent, style, styleCurrent } = this.props;
    return (
      <div>
        <div
          className={`Slide${isCurrent ? ' Slide_current' : ''}`}
          ref={this.slide}
          style={isCurrent ? { ...style, ...styleCurrent } : style}
        >
          {children}
        </div>
      </div>
    );
  }
}

Slide.propTypes = propTypes;
Slide.defaultProps = defaultProps;

export default Slide;
