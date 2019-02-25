/**
 * ElementResize Component.
 * Placeholder fot the description
 * @module ElementResize
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './ElementResize.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** onResize element handler. */
  onResize: PropTypes.func,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  onResize: console.log,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class ElementResize extends Component {
  constructor(props) {
    super(props);
    this.iframe = createRef();
    this.state = {};
    this.onResize = this.onResize.bind(this);
    this.timeout = 0;
  }

  onResize(){
    const iframe = this.iframe.current;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onResize({ width: iframe.offsetWidth, height: iframe.offsetHeight });
    }, 30);
  }

  componentDidMount(){
    this.iframe.current.contentWindow.addEventListener('resize', this.onResize);
  }

  componentWillUnmount(){
    this.iframe.current.contentWindow.removeEventListener('resize', this.onResize);
  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -999,
      top: 0,
      left: 0,
      border: 0,
      boxSizing: 'border-box',
      display: 'block',
      overflow: 'hidden',
    };
    return (
      <div className="ElementResize">
        <iframe
          style={style}
          height="100%"
          width="100%"
          seamless
          ref={this.iframe}
        />
      </div>
    );
  };
}

ElementResize.propTypes = propTypes;
ElementResize.defaultProps = defaultProps;

export default ElementResize;
