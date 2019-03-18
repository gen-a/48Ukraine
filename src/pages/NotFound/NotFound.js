/**
 * NotFound Component.
 * Placeholder fot the description
 * @module NotFound
 */
import React from 'react';
import PropTypes from 'prop-types';
import CompanyLogoWhite from '../../components/Svg/CompanyLogoWhite';

import './NotFound.scss';

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
const NotFound = ({ ...props }) =>{
  return (
    <div className="NotFound">
      <div style={{maxWidth: '300px', padding: '1rem', margin: '30px auto'}}>
        <CompanyLogoWhite />
      </div>
      <div className="NotFound__code">404</div>
      <p className="NotFound__message">Not Found Page</p>
    </div>
  );
};

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
