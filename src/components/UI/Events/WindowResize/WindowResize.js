/**
 * WindowResize React component. Detects windows resize.
 * When detected it call onResize with data object as follows {w, h}
 * @module WindowResize
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {

  /** On resize window function to dispatch resize with object. */
  onResize: PropTypes.func,
  /** Delay to avoid too often refreshes */
  delay: PropTypes.number,
  /** Media prefixes map for css */
  mediaPrefixes: PropTypes.shape({}),
};
/**
 * Default settings for resize detection.
 * @type {object}
 */
const defaultProps = {
  onResize: console.log,
  delay: 10,
  mediaPrefixes: {
    xs: [null, 200],
    sm: [201, 480],
    md: [481, 768],
    lg: [769, 960],
    xl: [960, null]
  }
};

/**
 * Class of the WindowWindowResize component.
 * @extends Component
 */
class WindowResize extends Component {
  /**
   * Convert min and max value to media query
   * @param min {number}
   * @param max {number}
   * @returns {string}
   */
  static rangeToQuery(min, max) {
    const media = ['screen'];
    if (min !== null) {
      media.push(`(min-width: ${min}px)`);
    }
    if (max !== null) {
      media.push(`(max-width: ${max}px)`);
    }
    return media.join(' and ');
  }

  /**
   * Constructor of the component.
   * @param props {object}
   */
  constructor(props) {
    super(props);
    const { mediaPrefixes } = props;
    this.onResize = this.onResize.bind(this);
    this.mediaQueries = {};
    this.timeout = 0;
    Object.keys(mediaPrefixes).forEach((key) => {
      this.mediaQueries[key] = WindowResize.rangeToQuery(...mediaPrefixes[key]);
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }

  detectTouchInWindow() {
    return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
  }
  /**
   * Call onResize prop with delay
   */
  onResize() {
    const { onResize, delay } = this.props;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      onResize({
        mediaPrefix: this.getMediaPrefix(),
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        isTouchEnabled: this.detectTouchInWindow()
      });
    }, delay);
  }

  /**
   * Get media prefix for css classNames
   * @returns {string}
   */
  getMediaPrefix() {
    const { mediaPrefixes } = this.props;
    return Object.keys(mediaPrefixes).find((key) => {
      if (window.matchMedia(this.mediaQueries[key]).matches) {
        return key;
      }
      return null;
    });
  }

  /**
   * Render component
   * @returns {null}
   */
  render() {
    return null;
  }
}

WindowResize.propTypes = propTypes;
WindowResize.defaultProps = defaultProps;

export default WindowResize;
