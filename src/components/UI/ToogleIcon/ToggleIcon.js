/**
 * ToggleIcon Component.
 * Call onChange function
 * @module ToggleIcon
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ToggleIcon.scss';

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
  onChange: PropTypes.func.isRequired,
};

/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  size: 32
};
const ToggleIcon = ({ svg, size, onChange, isOn }) => {
  const style = { width: `${size}px`, height: `${size}px` };
  const className = isOn ? 'ToggleIcon ToggleIcon_isActive' : 'ToggleIcon';
  return (
    <div className={className} style={style} onClick={() => onChange(!isOn)} >
      <div className="ToggleIcon__image">
        {svg}
      </div>
      <div className="ToggleIcon__status">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <g>
            <path
              fill="#E30D18"
              d="M25,31.563c-3.618,0-6.563-2.944-6.563-6.563s2.944-6.563,6.563-6.563s6.563,2.944,6.563,6.563
S28.618,31.563,25,31.563z"
            />
          </g>
          <polygon
            fill="#FFFFFF"
            points="28.864,21.843 28.157,21.136 25,24.293 21.843,21.136 21.136,21.843 24.293,25 21.136,28.157
21.843,28.864 25,25.707 28.157,28.864 28.864,28.157 25.707,25 "
          />
        </svg>
      </div>
    </div>
  );
};

ToggleIcon.propTypes = propTypes;
ToggleIcon.defaultProps = defaultProps;

export default ToggleIcon;
