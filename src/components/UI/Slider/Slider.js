/**
 * Slider Component.
 * Placeholder fot the description
 * @module Slider
 */
import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '../../Svg/ChevronLeft';
import styles from './Slider.scss';
import ElementResize from '../Events/ElementResize';
import TouchSwipe from '../Events/TouchSwipe';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 0,
      current: 0,
      slotWidth: parseInt(styles.slotWidth, 10),
    };
    this.viewer = createRef();
  }

  componentDidMount() {
    this.setIitialState();
  }
  onElementResize(){
    this.setIitialState();

  }
  setIitialState() {
    const { children } = this.props;
    const { slotWidth } = this.state;
    const { current: { offsetWidth: boxWidth } } = this.viewer;
    const max = children.length - Math.floor(boxWidth / slotWidth);
    this.setState({ max, boxWidth });
  }


  onSwipe(e) {
    if (e.direction === 'right') {
      this.flip(-1);
    }
    if (e.direction === 'left') {
      this.flip(1);
    }
  }

  flip(direction) {
    const { current, max } = this.state;
    this.setState({
      current: direction > 0 ? Math.min(current + 1, max) : Math.max(current - 1, 0)
    });
  }

  render() {
    const { children } = this.props;
    const { current, slotWidth, max, boxWidth } = this.state;
    const x = Math.min(children.length * slotWidth - boxWidth, current * slotWidth);
    const transform = `translateX(-${x}px)`;

    return (
      <div
        className="Slider"
      >
        <button className="Slider__button" onClick={() => this.flip(-1)} disabled={current === 0}>
          <ChevronLeft/>
        </button>

        <div
          className="Slider__viewer"
          ref={this.viewer}
        >
          <div className="Slider__slots" style={{ transform }}>
            {children.map((c) => {
              return (
                <div className="Slider__slot" key={c.props.id}>{c}</div>
              );
            })}
            <ElementResize onResize={e => this.onElementResize(e)}/>
          </div>
        </div>
        <button className="Slider__button Slider__button_right" onClick={() => this.flip(1)} disabled={current === max}>
          <ChevronLeft/>
        </button>
        <TouchSwipe target={this.viewer} onSwipe={(e) => this.onSwipe(e)}/>
      </div>
    );
  }
}

Slider.propTypes = propTypes;

export default Slider;
