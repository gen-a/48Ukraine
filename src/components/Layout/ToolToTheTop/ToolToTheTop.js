/**
 * ToolToTheTop Component.
 * Placeholder fot the description
 * @module ToolToTheTop
 */
import React from 'react';
import PropTypes from 'prop-types';
import ArrowUpBoldCircle from '../../Svg/ArrowUpBoldCircle';
import ToolIcon from '../../UI/ToolIcon';

import './ToolToTheTop.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ToolToTheTop = ({size}) =>{
  return (
    <div className="ToolToTheTop">
      <ToolIcon size={size} svg={<ArrowUpBoldCircle />} onClick={()=>{window.scrollTo(0, 0)}}/>
    </div>
  );
};

ToolToTheTop.propTypes = propTypes;
ToolToTheTop.defaultProps = defaultProps;

export default ToolToTheTop;
