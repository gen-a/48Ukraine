import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import MuiTheme from '../MuiTheme';

const propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
};

const defaultProps = {
  variant: 'fullWidth',
};

const styles = theme => ({
  divider: {
    backgroundColor: theme.palette.primary[100]
  }
});

function RenderDivider({ classes, variant }) {

  return (
    <MuiTheme>
      <Divider
        component="li"
        variant={variant}
        style={{
          listStyle: 'none',
          margin: '0 0 5px  0'
        }}
      />
    </MuiTheme>
  );
}

RenderDivider.propTypes = propTypes;
RenderDivider.defaultProps = defaultProps;

export default withStyles(styles)(RenderDivider);