/**
 * Custom scroll for overflowed contents
 * @module HorizontalSlider
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {};

class HorizontalSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursorLeft:0,
      cursorWidth:0,
      barWidth:0,
      value:9
    };
  }

  onComponentDidMount() {

  }
  onBarMouseUp(rect, clientX) {
    let offset = 0;
    const {cursorLeft, cursorWidth} = this.state;

    if (clientX - rect.left < cursorLeft) {
      offset--;
    } else {
      if (clientX - rect.left > cursorLeft + cursorWidth) {
        offset++;
      }
    }
    this.goBy(offset);
  }
  goBy(offset) {
    const {cursorMinWidth, onChange} = this.props;
    const {cursorLeft, cursorWidth, barWidth} = this.state;

    if (offset !== 0) {
      let distance = barWidth - cursorWidth;
      const value = Math.min(Math.max(0, cursorLeft + (cursorWidth - cursorMinWidth) * offset), distance) / distance;

      this.setState(prevState => ({
        ...prevState,
          value: value
      }));

      onChange(value);
    }
  }

  _onChangeValue() {
    // set cursor height and position
    this.cursorLeft = this.value * (this.barWidth - this.cursorWidth);
  }

  onCursorMouseDown(e) {
    const {barWidth, cursorWidth, cursorLeft} = this.state;
    const {onChange} = this.props;

    const delta = e.clientX - cursorLeft;
      const distance = barWidth - cursorWidth;
      const move = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const value = Math.min(Math.max(0, e.clientX - delta), distance) / distance;
        this.setState(prevState => ({
          ...prevState,
          value: value
        }));
        onChange(value);
      };
      const stop = function (e) {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stop);
      };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  }





  render() {
    const { children } = this.props;
    const { style } = this.state;
const barStyle = {width:[[barWidth]]px};

    return (
      <div className="HorizontalSlider">
        <div
          className="HorizontalSlider__bar"
          style={barStyle}
          onMouseUp={(e)=> {
            this.onBarMouseUp(e.currentTarget.getBoundingClientRect(), e.clientX);
          }} />




        <div className="HorizontalSlider__cursor"
             style$="left:[[cursorLeft]]px;width:[[cursorWidth]]px"
             onMouseDown={(e)=>{

               onCursorMouseDown

             }}
        />
      </div>
    );
  }
}


HorizontalSlider.propTypes = propTypes;

export default HorizontalSlider;
