/**
 * ResponsiveSlideShow Component.
 * Placeholder fot the description
 * @module ResponsiveSlideShow
 */
import React from 'react';
import PropTypes from 'prop-types';
import AspectRatioBox from '../AspectRatioBox';
import SlideShow from '../SlideShow';

import './ResponsiveSlideShow.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current variant of the group name to show. */
  variant: PropTypes.string.isRequired,
  /** Children array of Groups. */
  children: PropTypes.arrayOf( PropTypes.node ).isRequired,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ResponsiveSlideShow = ({ children: groups, variant }) => {

  const group = Array.isArray(groups)
    ? groups.filter(g => g.props.name === variant)[0] || groups[0]
    : groups;

  const { width, height, children } = group.props;

  return (
    <div className="ResponsiveSlideShow">
      <AspectRatioBox width={width} height={height}>
        <SlideShow autoPlay>
          {children}
        </SlideShow>
      </AspectRatioBox>
    </div>
  );
};

ResponsiveSlideShow.propTypes = propTypes;

export default ResponsiveSlideShow;
