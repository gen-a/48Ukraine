/**
 * SplashScreen Component.
 * Placeholder fot the description
 * @module SplashScreen
 */
import React from 'react';
import CompanyLogo from '../../components/Svg/CompanyLogo';
import Loader from '../../components/UI/Loader/Loader';
import ReactDOM from 'react-dom';
import { APP_ROOT } from '../../config/app';

import './SplashScreen.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const SplashScreen = () =>{

  return ReactDOM.createPortal(
    (
      <div className="SplashScreen">
        <div style={{maxWidth: '300px', padding: '1rem', margin: '30px auto'}}>
          <CompanyLogo />
        </div>
        <Loader isVisible />
      </div>
    ),
    APP_ROOT
  );
};

export default SplashScreen;
