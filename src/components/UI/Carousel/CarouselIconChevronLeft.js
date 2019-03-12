import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  fill: PropTypes.string.isRequired,
};

const CarouselIconChevronLeft = ({ fill, ...otherProps }) => (
  <svg {...otherProps} viewBox="0 0 64 64">
    <polygon fill={fill} points="44.263,12.85 41.574,10.161 19.737,32 41.574,53.839 44.263,51.151 25.113,32 "/>
  </svg>
);

CarouselIconChevronLeft.propTypes = propTypes;

export default CarouselIconChevronLeft;
