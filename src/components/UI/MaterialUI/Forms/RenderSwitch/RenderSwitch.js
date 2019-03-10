import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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

const RenderSwitch = ({checked, disabled, label, onChange}) => (
  <FormControlLabel
    control={
      <MuiTheme>
        <Switch
          disabled={disabled}
          checked={checked}
          onChange={() => onChange(!checked) }
          color="primary"
        />
      </MuiTheme>
    }
    label={label}
  />
);

RenderSwitch.propTypes = propTypes;
RenderSwitch.defaultProps = defaultProps;

export default RenderSwitch;
