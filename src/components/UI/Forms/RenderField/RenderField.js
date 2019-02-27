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
    /** Disabled status of the input. */
    disabled: PropTypes.bool,
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

  decorateEvent(func) {
    return newFunc => ((e) => {
      newFunc.call(this, e);
      if (func) {
        func(e);
      }
    });
  }

  render() {

    const { input, label, type, busy, meta: { error, warning } } = this.props;
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
    if (input.disabled) {
      className += ' RenderField_disabled';
    }
    if (focus) {
      className += ' RenderField_focus';
    }
    if (error.length > 0) {
      className += ' RenderField_withError';
    }
    if (busy > 0) {
      className += ' RenderField_busy';
    }

    input.onFocus = this.decorateEvent(input.onFocus)(this.onInputFocus);
    input.onBlur = this.decorateEvent(input.onBlur)(this.onInputBlur);

    return (
      <div className={className}>
        <label className="RenderField__label">{label}</label>
        <div>
          <div className="RenderField__input">
            <input {...input} type={type} />
            <div className="RenderField__underline" />
            { busy && <div className="RenderField__loader" /> }
          </div>
          {(error && <div className="RenderField__error">{error}</div>)
            || (warning && <div className="RenderField__warning">{warning}</div>)}
        </div>
      </div>
    );
  }
}

RenderField.propTypes = propTypes;
RenderField.defaultProps = defaultProps;

export default RenderField;
