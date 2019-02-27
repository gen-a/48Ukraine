/**
 * RenderCheckbox form component
 * Standard form field for usage in forms
 * @module RenderCheckbox
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';


import './RenderCheckbox.scss';

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
};

const defaultProps = {
  label: '',
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
  }
};

class RenderCheckbox extends Component {

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

    const { input, label, meta: { error, warning } } = this.props;
    const { focus } = this.state;

    let className = 'RenderCheckbox';

    if (focus) {
      className += ' RenderCheckbox_focus';
    }

    if (input.disabled) {
      className += ' RenderCheckbox_disabled';
    }

    if (input.readOnly) {
      className += ' RenderCheckbox_readOnly';
    }

    if (error.length > 0) {
      className += ' RenderCheckbox_withError';
    }

    input.onFocus = this.decorateEvent(input.onFocus)(this.onInputFocus);
    input.onBlur = this.decorateEvent(input.onBlur)(this.onInputBlur);

    return (
      <label>
        <div className={className}>
          <div className="RenderCheckbox__input">
            <div className="RenderCheckbox__checkbox">
              <input type="checkbox" {...input} />
              <div className="RenderCheckbox__icon">
                {(input.checked && <MdCheckBox size="100%"/>) || <MdCheckBoxOutlineBlank size="100%"/>}
              </div>
            </div>

          </div>
          <div className="RenderCheckbox__label">{label}</div>
          <div>
            {(error && <div className="RenderCheckbox__error">{error}</div>)
            || (warning && <div className="RenderCheckbox__warning">{warning}</div>)}
          </div>
        </div>
      </label>
    );
  }
}

RenderCheckbox.propTypes = propTypes;
RenderCheckbox.defaultProps = defaultProps;

export default RenderCheckbox;
