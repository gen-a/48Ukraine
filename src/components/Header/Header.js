/**
 * Header Component.
 * Placeholder fot the description
 * @module Header
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CompanyLogo, { ASPECT_RATIO } from '../Svg/CompanyLogo';
import { localizePath, APP_DEFAULT_LOCALE } from '../../localization';
import './Header.scss';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale. */
  locale: PropTypes.string,
  /** Media query prefix. */
  mediaPrefix: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  locale: APP_DEFAULT_LOCALE,
  mediaPrefix: 'xs',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Header = ({ locale, mediaPrefix }) => {

  const logoWidth = 32 * ASPECT_RATIO;
  return (
    <div className="Header">
      <div className="Header__toggleIconBox">

      </div>
      <div className="Header__logoBox">
        <NavLink to={localizePath('/', locale)}>
          <div className="Header__logo" style={{ width: logoWidth, margin: '0 auto' }}>
            <CompanyLogo />
          </div>
        </NavLink>
      </div>
      <div className="Header__toggleIconBox">

      </div>

    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
