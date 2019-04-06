/**
 * ElementResize Component.
 * Placeholder fot the description
 * @module ElementResize
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** onResize element handler. */
  onResize: PropTypes.func.isRequired,
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

  componentDidMount() {
    const { current: { contentWindow } } = this.iframe;
    contentWindow.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    const { current: { contentWindow } } = this.iframe;
    contentWindow.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const { current: target } = this.iframe;
    const { onResize } = this.props;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      onResize({ width: target.offsetWidth, height: target.offsetHeight });
    }, 30);
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
    return <iframe style={style} height="100%" width="100%" seamless ref={this.iframe} title={uuidv4()}/>;
  }
}

ElementResize.propTypes = propTypes;

export default ElementResize;
