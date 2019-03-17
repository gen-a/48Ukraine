/**
 * RenderField form component
 * Standard form field for usage in forms
 * @module RenderField
 *
 */
// todo add disabled and readonly autofilled style add label id
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RenderField.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Input node attributes */
  input: PropTypes.shape({
    /** Required status of the input. */
    required: PropTypes.bool,
    /** Readonly status of the input. */
    readOnly: PropTypes.bool,
    /** Value of the input */
    value: PropTypes.string,
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
  /** Label of the field.  */
  type: PropTypes.string,
  /** Show busy status bar. */
  busy: PropTypes.bool,
  /** Disabled status of the input. */
  disabled: PropTypes.bool,
};

const defaultProps = {
  type: 'text',
  label: '',
  busy: false,
  input: {
    required: false,
    disabled: false,
    readOnly: false,
    value: '',
    onChange: () => {},
  },
  disabled:false,
  meta: {
    error: '',
    warning: '',
    touched: false
  }
};


class RenderField extends Component {

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

    const { disabled, input, label, type, busy, meta: { error, dirty } } = this.props;
    const { focus } = this.state;

    let className = 'RenderField';

    if (input.value) {
      className += ' RenderField_notEmpty';
    }
    if (input.readOnly) {
      className += ' RenderField_readOnly';
    }
    if (input.required) {
      className += ' RenderField_required';
    }
    if (disabled) {
      className += ' RenderField_disabled';
    }
    if (focus) {
      className += ' RenderField_focus';
    }
    if (dirty && error && error.length > 0) {
      className += ' RenderField_withError';
    }
    if (busy > 0) {
      className += ' RenderField_busy';
    }

    input.onFocus = this.decorateHandler(input.onFocus)(this.onInputFocus);
    input.onBlur = this.decorateHandler(input.onBlur)(this.onInputBlur);

    return (
      <div className={className}>
        <label className="RenderField__label">{label}</label>
        <div>
          <div className="RenderField__input">
            <input {...input} type={type} disabled={disabled}/>
            <div className="RenderField__underline" />
            { busy && <div className="RenderField__loader"><div className="RenderField__loaderIndicator" /></div> }
          </div>
          {(dirty && error && <div className="RenderField__error">{error}</div>)}
        </div>
      </div>
    );
  }
}

RenderField.propTypes = propTypes;
RenderField.defaultProps = defaultProps;

export default RenderField;
