/**
 * RenderField form component
 * Standard form field for usage in forms
 * @module RenderField
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MuiTheme from '../../MuiTheme';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Classes object */
  classes: PropTypes.object.isRequired,
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
    /** On key press handler. */
    onKeyPress: PropTypes.func,
    /** On blur handler. */
    onBlur: PropTypes.func,
    /** On focus handler. */
    onFocus: PropTypes.func,
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
  /** Id of the field.  */
  id: PropTypes.string,
};

const defaultProps = {
  type: 'text',
  label: '',
  input: {
    required: false,
    disabled: false,
    readOnly: false,
    value: '',
    onKeyPress: () => {
    },
    onChange: () => {
    },
    onBlur: () => {
    },
    onFocus: () => {
    },
  },
  meta: {
    error: '',
    warning: '',
    touched: false
  },
  id: 'inputTextField'
};

const styles = () => ({
  textField: {
    marginLeft: 0,
    marginRight: 0
  }
});

const RenderField = ({ id, classes, input, label, type, meta: { error } }) => {
  return (
    <MuiTheme>
      <TextField
        fullWidth
        error={error.length > 0}
        required={input.required}
        disabled={input.disabled}
        type={type}
        id={id}
        label={label}
        helperText={error || ' '}
        className={classes.textField}
        value={input.value}
        onChange={(event) => input.onChange(event)}
        onBlur={(event) => input.onBlur(event)}
        onFocus={(event) => input.onFocus(event)}
        onKeyPress={(event) => input.onKeyPress(event)}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </MuiTheme>
  );
};

RenderField.propTypes = propTypes;
RenderField.defaultProps = defaultProps;

export default withStyles(styles)(RenderField);
