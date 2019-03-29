/**
 * InitScroll Component.
 * Placeholder fot the description
 * @module InitScroll
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Route location object. */
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  /** Children nodes. */
  children: PropTypes.node.isRequired
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const InitScroll = ({ location: { pathname, search }, children}) => {
  const [location, setLocation] = useState(`${pathname}${search}`);

  useEffect(() => {
    const newLocation = `${pathname}${search}`;
    if (location !== newLocation) {
      window.scrollTo(0, 0);
      setLocation(newLocation);
    }
  });

  return children;
};

InitScroll.propTypes = propTypes;

export default props => <Route render={routeProps => <InitScroll {...routeProps} {...props} />}/>;
