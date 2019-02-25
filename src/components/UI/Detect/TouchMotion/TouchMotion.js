/**
 * TouchMotion React component. Detects move by touch or mouse activity.
 * When motion it detected it call onStart, onMove, onEnd function with data object as follows
 * {points, timer, pointerType}
 * @module TouchMotion
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** On move function to dispatch. */
  onMove: PropTypes.func,
  /** On start function to dispatch. */
  onStart: PropTypes.func,
  /** On end function to dispatch. */
  onEnd: PropTypes.func,
  /** Children elemEnt to be rendered inside the component. */
  children: PropTypes.element.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  onMove: console.log,
  onStart: console.log,
  onEnd: console.log,
};

/**
 * Class of the TouchMotion component.
 * @extends Component
 */
class TouchMotion extends Component {
  /**
   * Build object of motion data
   * @param touches {Array} - Array of current touches
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
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.lastData = null;
  }

  /**
   * Start detect motion if touches length array is 1
   * @param touches {Array}
   */
  onTouchStart(touches) {
    const { onStart } = this.props;
    onStart(this.storeData(TouchMotion.getDataObject(touches)));
  }

  /**
   * End or start detect motion depending on number of the touches
   * @param touches {Array}
   */
  onTouchEnd(touches) {
    const { onEnd } = this.props;
    onEnd({ ...this.lastData, timer: new Date().getTime() });
    if (touches.length === 1) {
      this.onTouchStart(touches);
    }
  }

  /**
   * Collect on move touch data
   * @param touches {Array}
   */
  onTouchMove(touches) {
    const { onMove } = this.props;
    onMove(this.storeData(TouchMotion.getDataObject(touches)));
  }

  /**
   * @param data
   * @returns {*}
   */
  storeData(data){
    this.lastData = data;
    return data;
  }

  /**
   * Render component
   * @returns {Element}
   */
  render() {
    const { children } = this.props;
    return (
      <div
        style={{ width: 'fit-content', height: 'fit-content' }}
        onTouchStart={e => this.onTouchStart(e.touches)}
        onTouchEnd={e => this.onTouchEnd(e.touches)}
        onTouchMove={e => this.onTouchMove(e.touches)}
      >
        {children}
      </div>
    );
  }
}

TouchMotion.propTypes = propTypes;
TouchMotion.defaultProps = defaultProps;

export default TouchMotion;
