/**
 * HomeSlideShow Component.
 * Placeholder fot the description
 * @module HomeSlideShow
 */
import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveSlideShow from '../UI/ResponsiveSlideShow';
import ResponsiveSlideShowGroup from '../UI/ResponsiveSlideShow/Group';

import './HomeSlideShow.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Window width for variant calculation. */
  windowWidth: PropTypes.number.isRequired,
  /** Window height for variant calculation. */
  windowHeight: PropTypes.number.isRequired
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const HomeSlideShow = ({ windowWidth, windowHeight }) => {

  const imageStyle = { display: 'block', width: '100%' };

  const slideShowVariant = windowWidth / windowHeight > 1 ? 'h' : 'v';
  const slideShowBoxStyle = slideShowVariant === 'h'
    ? { margin: '40px auto 60px auto' }
    : { maxWidth: '500px', margin: '40px auto 60px auto' };

  const imagesFs = [
    'banner-step-fs-01-1.jpg',
    'banner-step-fs-01-2.jpg',
    'banner-step-fs-01-3.jpg',
    'banner-step-fs-01-4.jpg'
  ].map(src => (
    <div id={src} key={src}>
      <img
        src={`/images/home-slide-show/${src}`}
        alt=""
        style={imageStyle}
      />
    </div>
  ));
  const imagesSm = [
    'banner-step-sm-01-1.jpg',
    'banner-step-sm-01-2.jpg',
    'banner-step-sm-01-3.jpg',
    'banner-step-sm-01-4.jpg'
  ].map(src => (
    <div id={src} key={src}>
      <img
        src={`/images/home-slide-show/${src}`}
        alt=""
        style={imageStyle}
      />
    </div>
  ));


  return (
    <div style={slideShowBoxStyle}>
      <ResponsiveSlideShow variant={slideShowVariant}>
        <ResponsiveSlideShowGroup name="v" width={700} height={700}>
          {imagesSm}
        </ResponsiveSlideShowGroup>
        <ResponsiveSlideShowGroup name="h" width={1200} height={350}>
          {imagesFs}
        </ResponsiveSlideShowGroup>
      </ResponsiveSlideShow>
    </div>
  );
};

HomeSlideShow.propTypes = propTypes;

export default HomeSlideShow;
