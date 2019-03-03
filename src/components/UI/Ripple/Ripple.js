/**
 * Ripple Component.
 * Placeholder fot the description
 * @module Ripple
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './Ripple.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** CSS color of the circle. */
  color: PropTypes.string,
  /** Node for attaching effect. */
  children: PropTypes.node.isRequired,
  /** Disabled status of the ripple. */
  disabled: PropTypes.bool,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  color: 'white',
  disabled: false,
};

/**
 * Ripple Component for material design like click effect
 */
class Ripple extends Component {
  /**
   * Constructor of the component.
   * @param props {object}
   */
  constructor(props) {
    super(props);
    this.root = createRef();
    this.onMouseClick = this.onMouseClick.bind(this);
  }

  /**
   * Append listeners to children object
   */
  componentDidMount() {
    const { current: { childNodes } } = this.root;
    const target = childNodes[0];
    target.addEventListener('click', this.onMouseClick);
  }

  /**
   * Remove mouse click listeners
   */
  componentWillUnmount() {
    const { current: { childNodes } } = this.root;
    const target = childNodes[0];
    target.removeEventListener('click', this.onMouseClick);
  }

  /**
   * Mouse click handler
   */
  onMouseClick(e) {
    const { color, disabled } = this.props;
    if (!disabled) {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      // create ripple circle
      const circle = document.createElement('div');
      // add class to this
      circle.classList.add('Ripple');
      // calculate the size
      const d = Math.max(target.clientWidth, target.clientHeight);
      const size = `${d}px`;
      // assign styles
      circle.style.backgroundColor = color;
      circle.style.width = size;
      circle.style.height = size;
      circle.style.left = `${e.clientX - rect.left - d / 2}px`;
      circle.style.top = `${e.clientY - rect.top - d / 2}px`;
      // attach circle
      target.appendChild(circle);
      // remove on timeout
      setTimeout(() => target.removeChild(circle), 1000);
    }
  }

  render() {
    const { children } = this.props;
    return <div style={{ width: 'fit-content', height: 'fit-content' }} ref={this.root}>{children}</div>;
  }
}

Ripple.propTypes = propTypes;
Ripple.defaultProps = defaultProps;

export default Ripple;