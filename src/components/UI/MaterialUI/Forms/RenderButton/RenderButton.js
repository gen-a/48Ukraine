/**
 * RenderButton form component
 * Standard form field for usage in forms
 * @module RenderButton
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
import MuiTheme from '../../MuiTheme';

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

const styles = theme => ({
  button: {
    margin: 0,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

const RenderButton = ({ classes, input, label }) => (
  <MuiTheme>
    <Button
      disabled={input.disabled}
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={input.onClick}
    >
      {label}
      <Send className={classes.rightIcon}/>
    </Button>
  </MuiTheme>
);

RenderButton.propTypes = propTypes;
RenderButton.defaultProps = defaultProps;

export default withStyles(styles)(RenderButton);