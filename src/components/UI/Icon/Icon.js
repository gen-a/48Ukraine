import React from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Text message of the toast. */
  svg: PropTypes.node.isRequired,
  /* Text message of the toast. */
  size: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  size: 32,
};


const Icon = ({ svg, size }) =>
{
  const style = { width: `${size}px`, height: `${size}px` };
  return (
    <div className="Icon" style={style}>{svg}</div>
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
