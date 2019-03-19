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
const ResponsiveSlideShow = ({ children: groups, variant }) => {

  const group = Array.isArray(groups)
    ? groups.filter(g => g.props.name === variant)[0] || groups[0]
    : groups;

  const { width, height, children } = group.props;

  return (
    <div className="ResponsiveSlideShow">
      <AspectRatioBox width={width} height={height}>
        <SlideShow autoPlay={true}>
          {children}
        </SlideShow>
      </AspectRatioBox>
    </div>
  );
};

ResponsiveSlideShow.propTypes = propTypes;
ResponsiveSlideShow.defaultProps = defaultProps;

export default ResponsiveSlideShow;
