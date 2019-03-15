/**
 * Progressive Image Component.
 * Progressive image loading
 * @module Image
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadImage } from '../AsyncImage/AsyncImage';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Full size image source url. */
  fs: PropTypes.string.isRequired,
  /** Small (placeholder) size image source url. */
  sm: PropTypes.string.isRequired,
  /** Ratio of the image for responsive image container box. */
  ratio: PropTypes.number.isRequired,
  /** Text for alt tag of the image. */
  alt: PropTypes.string.isRequired,
  /** Box background. */
  background: PropTypes.string,
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
  background: '#f6f6f6',
  onError: console.log,
  onLoad: ()=>{},
};


class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sm: null,
      fs: null,
      opacity: 0
    }
  }

  componentDidMount() {
    const { fs, sm, onError, onLoad } = this.props;
    loadImage(sm)
      .then((image) => {
        this.setState({ ...this.state,  sm: image });
        loadImage(fs)
          .then((image) => {
            this.setState({ ...this.state, fs: image });
            onLoad(image);
            setTimeout(()=>{
              this.setState({ ...this.state, opacity: 1 });
            } , 0);
          })
      })
      .catch(onError);
  }

  render() {
    const { ratio, alt, background } = this.props;
    const { sm, fs, opacity } = this.state;
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    };

    return (
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingBottom: `${ratio * 100}%`,
          background,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden'
        }}>
        {sm !== null && (
          <img
            src={sm.src}
            style={{
              ...style,
              filter: 'blur(50px)',
              transform: 'scale(1)'
            }}
          />
        )}
        {fs !== null && (
          <img
            src={fs.src}
            style={{
              ...style,
              opacity,
              transition: 'opacity 1s linear'
            }}
            alt={alt}
          />
        )}
      </div>);
  }
}

ProgressiveImage.propTypes = propTypes;
ProgressiveImage.defaultProps = defaultProps;

export default ProgressiveImage;