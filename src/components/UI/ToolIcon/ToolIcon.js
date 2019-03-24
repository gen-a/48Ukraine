/**
 * ToolIcon Component.
 * Call onChange function
 * @module ToolIcon
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ToolIcon.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Svg image of the icon. */
  svg: PropTypes.node.isRequired,
  /** Size of the icon in pixels. */
  size: PropTypes.number,
  /** Status of the toggle. */
  isOn: PropTypes.bool.isRequired,
  /** On change handler. */
  onClick: PropTypes.func.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  size: 32,
};
const ToolIcon = ({ svg, size, onClick, isOn }) => {
  const style = { width: `${size}px`, height: `${size}px` };
  const className = isOn ? 'ToolIcon ToolIcon_isActive' : 'ToolIcon';
  return (
    <div className={className} style={style} onClick={() => onClick()} >
      <div className="ToolIcon__image">
        {svg}
      </div>
    </div>
  );
};

ToolIcon.propTypes = propTypes;
ToolIcon.defaultProps = defaultProps;

export default ToolIcon;
