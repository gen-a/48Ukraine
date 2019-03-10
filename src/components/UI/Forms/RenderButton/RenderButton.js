/**
 * RenderButton form component
 * Standard form field for usage in forms
 * @module RenderButton
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RenderButton.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Input node attributes */
  input: PropTypes.shape({
    /** Disabled status of the input */
    disabled: PropTypes.bool,
  }),
  /** Label of the field.  */
  label: PropTypes.string,
};

const defaultProps = {
  label: 'submit',
  input: {
    disabled: false,
  }
};

class RenderButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  onInputFocus() {
    this.setState(prevState => ({ ...prevState, focus: true }));
  }

  onInputBlur() {
    this.setState(prevState => ({ ...prevState, focus: false }));
  }

  decorateHandler(func) {
    return newFunc => ((e) => {
      newFunc.call(this, e);
      if (func) {
        func(e);
      }
    });
  }

  render() {

    const { input, label } = this.props;
    const { focus } = this.state;

    let className = 'RenderButton';

    if (focus) {
      className += ' RenderButton_focus';
    }

    if (input.disabled) {
      className += ' RenderButton_disabled';
    }

    input.onFocus = this.decorateHandler(input.onFocus)(this.onInputFocus);
    input.onBlur = this.decorateHandler(input.onBlur)(this.onInputBlur);

    return (
        <div className={className}>
          <div className="RenderButton__input">
              <button {...input}> {label}</button>
          </div>
        </div>
    );
  }
}

RenderButton.propTypes = propTypes;
RenderButton.defaultProps = defaultProps;

export default RenderButton;
