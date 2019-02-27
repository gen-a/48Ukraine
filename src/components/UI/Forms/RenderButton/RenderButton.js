/**
 * RenderButton form component
 * Standard form field for usage in forms
 * @module RenderButton
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';


import './RenderButton.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Input node attributes */
  input: PropTypes.shape({
    /** Checked status of the input */
    checked: PropTypes.bool,
    /** Disabled status of the input */
    disabled: PropTypes.bool,
    /** Readonly status of the input */
    readonly: PropTypes.bool,
    /** On change handler. */
    onChange: PropTypes.func,
  }),
  /** Input node attributes */
  meta: PropTypes.shape({
    /** Warning message text. */
    warning: PropTypes.string,
    /** Error message text. */
    error: PropTypes.string,
  }),
  /** Label of the field.  */
  label: PropTypes.string,
  /** Type of the button.  */
  type: PropTypes.string,
};

const defaultProps = {
  label: 'submit',
  input: {
    checked: false,
    disabled: false,
    readonly: false,
    onChange: () => {
    }
  },
  meta: {
    error: '',
    warning: ''
  },
  type: 'submit'
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

  decorateEvent(func) {
    return newFunc => ((e) => {
      newFunc.call(this, e);
      if (func) {
        func(e);
      }
    });
  }

  render() {

    const { type, input, label, meta: { error, warning } } = this.props;
    const { focus } = this.state;

    let className = 'RenderButton';

    if (focus) {
      className += ' RenderButton_focus';
    }

    if (input.disabled) {
      className += ' RenderButton_disabled';
    }

    input.onFocus = this.decorateEvent(input.onFocus)(this.onInputFocus);
    input.onBlur = this.decorateEvent(input.onBlur)(this.onInputBlur);

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
