import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiTheme from '../../MuiTheme';

const propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
};

const defaultProps = {
  style: {},
};

const styles = theme => ({
  circularProgress: {
    color: theme.palette.secondary[300],
    animationDuration: '550ms',
    position: 'absolute',
    top: '50%',
    margin: '-12px 10px 0 10px'
  },
});

function RenderCircularProgress ({ classes, style }) {
  return (
    <MuiTheme>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.circularProgress}
        style={style}
        size={24}
        thickness={4}
      />
    </MuiTheme>
  );
}

RenderCircularProgress.propTypes = propTypes;
RenderCircularProgress.defaultProps = defaultProps;

export default withStyles(styles)(RenderCircularProgress);