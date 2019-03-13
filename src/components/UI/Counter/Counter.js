/**
 * Counter Component.
 * Placeholder fot the description
 * @module Counter
 */
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '../../Svg/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import colors from '../../../_colors.scss';

import './Counter.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  classes: PropTypes.shape({})
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  value: 333,
  max: 0,
  min: 0,
  classes: {},
  onChange: console.log,
};

const styles = theme => ({

  box: {
    display: 'flex'
  },
  value: {
    flex: '0 1 48px',
    textAlign: 'center',
    fontSize: '1.25rem',
    lineHeight: '36px'
  },
  button: {
    margin: 0,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: colors.colorNeutral3H,
    },
    cursor: 'pointer',
    minWidth: '48px',
    '&[disabled]': {
      opacity: .2,
    },
  },
});

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Counter = ({ classes, value, max, min, onChange }) => {
  return (
    <div className={classes.box}>
      <Button
        className={classes.button}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value === min}
      >
        <ChevronLeft width="24px" height="24px" style={{ transform: 'rotate(-90deg)' }}/>
      </Button>

      <div className={classes.value}>
        {value}
      </div>

      <Button
        className={classes.button}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value === max}
      >
        <ChevronLeft width="24px" height="24px" style={{ transform: 'rotate(90deg)' }}/>
      </Button>
    </div>
  );
};

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

export default withStyles(styles)(Counter);
