/**
 * CarouselButton Component.
 * Placeholder fot the description
 * @module CarouselButton
 */
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '../../../Svg/ChevronLeft';
import withStyles from 'react-jss';
import classNames from 'classnames';
import './CarouselButton.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  type: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.number,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  type: 'left',
  color: 'white',
  width: 0,
  disabled: false,
  backgroundColor: 'transparent',
};

const styles = {
  button: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    outline: 'none',
    border: 'none',
    display: 'block',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.4s',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  disabled: {
    opacity: 0.2,
    cursor: 'default',
    '&:hover': {
      opacity: 0.2,
    },
  },
  right: {
    right: 0,
    '& svg': {
      transform: 'translate(-50%, -50%) rotate(180deg)'
    },
  },
  left: {
    left: 0
  },
  icon: {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const CarouselButton = ({classes, type, width, disabled, backgroundColor, color, onClick }) => {
  return (
    <button
      className={classNames( classes.button, classes[type], disabled && classes.disabled )}
      style={{ width: `${width}px`, background: backgroundColor }}
      onClick={() => onClick()}
    >
      <ChevronLeft
        width="48px"
        height="48px"
        fill={color}
        className={classes.icon}
      />
    </button>
  );
};

CarouselButton.propTypes = propTypes;
CarouselButton.defaultProps = defaultProps;

export default withStyles(styles)(CarouselButton);
