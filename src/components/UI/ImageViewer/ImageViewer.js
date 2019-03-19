/**
 * ImageViewer Component.
 * Placeholder fot the description
 * @module ImageViewer
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AspectRatioBox from '../AspectRatioBox/AspectRatioBox';
import { uid } from 'react-uid';
import TouchSwipe from '../Detect/TouchSwipe';
import Image from '../FlexibleImage/FlexibleImage';
import Ripple from '../Ripple';

import './ImageViewer.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  /** Array of the images for the viewer. */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      /** Src of the thumbnail image. */
      sm: PropTypes.string,
      /** Src of the full size image. */
      fs: PropTypes.string,
    })
  ).isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  orientation: 'portrait',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ImageViewer = ({ images, orientation }) => {

  const [current, setState] = useState(0);
  return (
    <div className={
      orientation === 'portrait'
        ? 'ImageViewer'
        : 'ImageViewer ImageViewer_landscape'
    }>
      <div className="ImageViewer__screen">
        <TouchSwipe onSwipe={(e) => {
          switch (e.direction) {
            case 'right':
              setState(current === 0 ? images.length - 1 : current - 1);
              break;
            case 'left':
              setState(current === images.length - 1 ? 0 : current + 1);
              break;
            default:
          }
        }}>
          <AspectRatioBox width={1} height={1}>
            {images.map((p, i) => (
              <img
                key={uid(p.fs)}
                src={p.fs}
                alt={p.fs}
                className={
                  current === i
                    ? 'ImageViewer__image ImageViewer__image_current'
                    : 'ImageViewer__image'
                }
              />
            ))}
          </AspectRatioBox>
        </TouchSwipe>
      </div>

      <div className="ImageViewer__buttons">
        {images.map((p, i) => (
          <Ripple key={uid(p.fs)}>
            <button
              className={current === i
                ? 'ImageViewer__button ImageViewer__button_current'
                : 'ImageViewer__button'
              }
              onClick={() => setState(i)}
            >
              <div className="ImageViewer__buttonFrame">
                <Image src={p.sm} alt={p.sm} />
              </div>
            </button>
          </Ripple>
        ))}
      </div>
    </div>
  );
};

ImageViewer.propTypes = propTypes;
ImageViewer.defaultProps = defaultProps;

export default ImageViewer;
