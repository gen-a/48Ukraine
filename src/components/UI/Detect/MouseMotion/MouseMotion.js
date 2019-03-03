/**
 * MouseMotion React component. Detects mouse move activity.
 * When motion it detected it call onStart, onMove, onEnd function with data object as follows
 * { start:{ x, y, timer}, current:{ x, y, timer}}
 * @module MouseMotion
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
  /** Children element to be rendered inside the component. */
  children: PropTypes.node.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  onMove: console.log,
  onStart: console.log,
  onEnd: console.log
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
    this.startPoint = {};
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

  /**
   * Render component
   * @returns {Element}
   */

  render() {
    const { children } = this.props;
    return (
      <div
        style={{ width: 'fit-content', height: 'fit-content' }}
        onMouseDown={(e) => {
          e.preventDefault();
          this.onStart({ ...e });
        }}
      >
        {children}
      </div>
    );
  }
}

MouseMotion.propTypes = propTypes;
MouseMotion.defaultProps = defaultProps;

export default MouseMotion;
