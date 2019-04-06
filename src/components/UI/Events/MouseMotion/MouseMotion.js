/**
 * MouseMotion React component. Detects mouse move activity.
 * When motion it detected it call onStart, onMove, onEnd function with data object as follows
 * { start:{ x, y, timer}, current:{ x, y, timer}}
 * @module MouseMotion
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Target element for swipe detection. */
  target: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  /** On move function to dispatch. */
  onMove: PropTypes.func.isRequired,
  /** On start function to dispatch. */
  onStart: PropTypes.func.isRequired,
  /** On end function to dispatch. */
  onEnd: PropTypes.func.isRequired,
};

/**
 * Class of the MouseMotion component.
 * @extends Component
 */
class MouseMotion extends Component {
  /**
   * Constructor of the component.
   * @param props {object}
   */
  constructor(props) {
    super(props);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onStart = this.onStart.bind(this);
    this.startPoint = {};
  }

  /**
   * Configure motion
   */
  componentDidMount() {
    const { target: { current: element } } = this.props;
    element.addEventListener('mousedown', this.onStart);
  }

  /**
   * Start detect motion if touches length array is 1
   * @param e {object}
   */
  onStart(e) {
    this.startPoint = {
      timer: new Date().getTime(),
      y: e.clientY,
      x: e.clientX,
    };
    const { onStart } = this.props;
    onStart({ start: this.startPoint, current: this.startPoint });
    window.addEventListener('mousemove', this.onMove, false);
    window.addEventListener('mouseup', this.onEnd, false);
  }

  /**
   * Collect on move pointer data
   * @param e {Event}
   */
  onMove(e) {
    const { onMove } = this.props;
    onMove({
      start: this.startPoint,
      current: {
        timer: new Date().getTime(),
        y: e.clientY,
        x: e.clientX,
      }
    });
  }

  /**
   * End collecting data
   * @param e {Event}
   */
  onEnd( e ) {
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('mouseup', this.onEnd);
    const { onEnd } = this.props;
    onEnd({
      start: this.startPoint,
      current: {
        timer: new Date().getTime(),
        y: e.clientY,
        x: e.clientX,
      }
    });
  }

  render() {
    return null;
  }
}

MouseMotion.propTypes = propTypes;

export default MouseMotion;
