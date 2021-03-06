/**
 * AspectRatioBox Component.
 * Placeholder fot the description
 * @module AspectRatioBox
 */
import stylePropType from 'react-style-proptype';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Relational width for ratio calculation. */
  width: PropTypes.number.isRequired,
  /** Relational height for ratio calculation. */
  height: PropTypes.number.isRequired,
  /** Renderable element. */
  children: PropTypes.node.isRequired,
  /** CSS style object. */
  style: stylePropType,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  style: {},
};
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const AspectRatioBox = ({ width, height, children, style }) => {
  return (
    <div
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        paddingBottom: `${height / width  * 100}%`
      }}
    >
      <div
        style={{
          ...style,
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {children}
      </div>
    </div>
  );
};

AspectRatioBox.propTypes = propTypes;
AspectRatioBox.defaultProps = defaultProps;

export default AspectRatioBox;
