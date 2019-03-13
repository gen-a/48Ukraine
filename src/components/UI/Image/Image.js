/**
 * Image Component.
 * Placeholder fot the description
 * @module Image
 */
import React from 'react';
import PropTypes from 'prop-types';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Source address of the image. */
  src: PropTypes.string.isRequired,
  /** TExt for alt tag. */
  alt: PropTypes.string.isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {

};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Image = ({ src, alt }) => {
  const style = {
    position: 'absolute',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
    transition: 'opacity 0.4s'
  };

  return (
    <img src={src} alt={alt} style={style} onLoad={(e) => { e.currentTarget.style.opacity = 1 } } />
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
