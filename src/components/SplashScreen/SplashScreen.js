/**
 * SplashScreen Component.
 * Placeholder fot the description
 * @module SplashScreen
 */
import React from 'react';
import PropTypes from 'prop-types';
import CompanyLogoWhite from '../Svg/CompanyLogoWhite';
import Loader from '../UI/Loader';
import ReactDOM from 'react-dom';
import { APP_ROOT } from '../../config/app';

import './SplashScreen.scss';

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
const SplashScreen = ({ ...props }) =>{

  return ReactDOM.createPortal(
    (
      <div className="SplashScreen">
        <div style={{maxWidth: '300px', padding: '1rem', margin: '30px auto'}}>
          <CompanyLogoWhite />
        </div>
        <Loader isVisible />
      </div>
    ),
    APP_ROOT
  );
};

SplashScreen.propTypes = propTypes;
SplashScreen.defaultProps = defaultProps;

export default SplashScreen;
