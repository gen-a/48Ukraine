/**
 * Asynchronious Image Component.
 * Show placeholder while loading image
 * @module Image
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Placeholder while loading. */
  placeholder: PropTypes.node,
  /** Image source url. */
  src: PropTypes.string.isRequired,
  /** Text for alt tag of the image. */
  alt: PropTypes.string.isRequired,
  /** Error handler. */
  onError: PropTypes.func,
  /** Load full size image handler. */
  onLoad: PropTypes.func,

};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  placeholder: <div>Loading...</div>,
  onError: console.log,
  onLoad: ()=>{},
};


/**
 * Image loader
 * @param url
 * @returns {Promise}
 */
export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener('load', e => resolve(img));
    img.addEventListener('error', () => {
      reject(`Failed to load image's URL: ${url}`);
    });
    img.src = url;
  });
};

class AsyncImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  }

  componentDidMount() {
    const { src, onError, onLoad } = this.props;
    loadImage(src)
      .then((image) => {
        this.setState({ image });
        onLoad(image);
      })
      .catch(onError);
  }

  render() {
    const { placeholder, alt } = this.props;
    const { image } = this.state;
    return image === null
      ? placeholder
      : <img src={image.src} alt={alt}/>;
  }
}

AsyncImage.propTypes = propTypes;
AsyncImage.defaultProps = defaultProps;

export default AsyncImage;