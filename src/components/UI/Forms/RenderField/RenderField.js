/**
 * RenderField form component
 * Standard form field for usage in forms
 * @module RenderField
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Input node attributes */
  input: PropTypes.shape({}),
  /** Input node attributes */
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    warning: PropTypes.string,
    error: PropTypes.string,
  }),
  /** Label of the field.  */
  label: PropTypes.string,
  /** Label of the field.  */
  type: PropTypes.string,
  /** Mark input as touched.  */
  touched: PropTypes.bool,
  /** Warning message text. */
  warning: PropTypes.string,
  /** Error message text. */
  error: PropTypes.string,
};

const defaultProps = {
  error: '',
  warning: '',
  touched: false,
  type: 'text',
  label: '',
  input: {},
  meta: {
    error: '',
    warning: '',
    touched: false
  }
};

const RenderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

RenderField.propTypes = propTypes;
RenderField.defaultProps = defaultProps;

export default RenderField;
