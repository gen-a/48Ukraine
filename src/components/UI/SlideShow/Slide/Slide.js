/**
 * Slide Component.
 * Placeholder fot the description
 * @module Slide
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

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
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  isCurrent: false,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class Slide extends Component {
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
    const { isCurrent: nowIsCurrent } = this.props;
    const { isCurrent: beforeIsCurrent } = prevProps;
    // check if in previous props element was current
    if (!nowIsCurrent && nowIsCurrent !== beforeIsCurrent) {
      const { current: slide } = this.slide;
      // create element attach to DOM
      const slideOut = slide.cloneNode(true);
      slideOut.className = 'Slide';
      // set timeout for removal
      setTimeout(() => slide.parentNode.removeChild(slideOut), 1000);
      slide.parentNode.appendChild(slideOut);
    }
  }


  render() {
    const { children, isCurrent } = this.props;
    return (
      <div>
        <div className={`Slide${isCurrent ? ' Slide_current' : ''}`} ref={this.slide} >
          {children}
        </div>
      </div>
    );
  }
}

Slide.propTypes = propTypes;
Slide.defaultProps = defaultProps;

export default Slide;
