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

  return (
    <div style={slideShowBoxStyle}>
      <ResponsiveSlideShow variant={slideShowVariant}>
        <ResponsiveSlideShowGroup name="v" width={500} height={500}>
          <div id="111">
            <img
              src="/images/home-slide-show/banner-facebook-flowers-624x624.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
          <div id="222">
            <img
              src="/images/home-slide-show/banner-facebook-free-st.niklas-624x624.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
          <div id="333">
            <img
              src="/images/home-slide-show/banner-facebook-free-caviar-624x624.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
        </ResponsiveSlideShowGroup>
        <ResponsiveSlideShowGroup name="h" width={1364} height={300}>
          <div id="111">
            <img
              src="/images/home-slide-show/file_2.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
          <div id="222">
            <img
              src="/images/home-slide-show/file_3.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
          <div id="333">
            <img
              src="/images/home-slide-show/file_4.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
        </ResponsiveSlideShowGroup>
      </ResponsiveSlideShow>
    </div>
  );
};

HomeSlideShow.propTypes = propTypes;

export default HomeSlideShow;
