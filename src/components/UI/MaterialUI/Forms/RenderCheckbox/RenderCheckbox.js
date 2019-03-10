import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiTheme from '../../MuiTheme';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Checked status of the components */
  checked: PropTypes.bool,
  /** Disabled status of the input */
  disabled: PropTypes.bool,
  /** Label of the field.  */
  label: PropTypes.string,
  /** On change handler.  */
  onChange: PropTypes.func,
};

const defaultProps = {
  checked: false,
  disabled: false,
  label: '',
  onChange: ()=>{},
};

const RenderCheckbox = ({ disabled, checked, label, onChange }) => (
  <FormControlLabel
    control={
      <MuiTheme>
        <Checkbox
          disabled={disabled}
          checked={checked}
          onChange={() => onChange(!checked)}
          color="primary"
        />
      </MuiTheme>
    }
    label={label}
  />
);

RenderCheckbox.propTypes = propTypes;
RenderCheckbox.defaultProps = defaultProps;

export default RenderCheckbox;

