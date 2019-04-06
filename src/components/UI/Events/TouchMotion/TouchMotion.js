/**
 * TouchMotion React component. Detects move by touch or mouse activity.
 * When motion it detected it call onStart, onMove, onEnd function with data object as follows
 * {points, timer, pointerType}
 * @module TouchMotion
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
 * Class of the TouchMotion component.
 * @extends Component
 */
class TouchMotion extends Component {
  /**
   * Build object of motion data
   * @param touches {TouchList} - Array of current touches
   * @returns {{timer: number, pointerType: (string|*), points}}
   */
  static getDataObject(touches) {
    const points = [];
    for (let i = 0; i < touches.length; i++) {
      points.push({ x: touches[i].clientX, y: touches[i].clientY });
    }
    return {
      timer: new Date().getTime(),
      points
    };
  }

  /**
   * Constructor of the component.
   * @param props {object}
   */
  constructor(props) {
    super(props);
    this.touchstart = this.touchstart.bind(this);
    this.touchmove = this.touchmove.bind(this);
    this.touchend = this.touchend.bind(this);
    this.lastData = null;
  }

  /**
   * Configure motion
   */
  componentDidMount() {
    this.setListeners('addEventListener');
  }

  /**
   * Touch start handler
   * @param touches {TouchList}
   */
  touchstart({ touches }) {
    const { onStart } = this.props;
    onStart(this.storeData(TouchMotion.getDataObject(touches)));
  };

  /**
   * Touch move handler
   * @param touches {TouchList}
   */
  touchmove({ touches }) {
    const { onMove } = this.props;
    onMove(this.storeData(TouchMotion.getDataObject(touches)));
  };

  /**
   * Touch end handler
   */
  touchend() {
    const { onEnd } = this.props;
    onEnd({ ...this.lastData, timer: new Date().getTime() });
  };

  /**
   * Add or remove event listeners
   * @param action {string} - addEventListener or removeEventListener
   */
  setListeners(action) {
    const { target: { current: element } } = this.props;
    ['touchstart', 'touchmove', 'touchend'].forEach(key => element[action](key, this[key]));
  }

  /**
   * @param data
   * @returns {*}
   */
  storeData(data) {
    this.lastData = data;
    return data;
  }

  /**
   * Render component
   * @returns {Element}
   */
  render() {
    return null;
  }
}

TouchMotion.propTypes = propTypes;

export default TouchMotion;
