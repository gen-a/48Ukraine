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
  /** Height in pixels. */
  height: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  locale: APP_DEFAULT_LOCALE,
  mediaPrefix: 'xs',
  height: 48
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Header = ({ height, locale, mediaPrefix }) => {

  const logoWidth = 32 * ASPECT_RATIO;
  return (
    <div className="Header" style={{ height: `${height}px` }}>
      <div className="Header__toggleIconBox">

      </div>
      <div className="Header__logoBox">

        <div className="Header__logo" style={{ width: logoWidth, margin: '0 auto' }}>
          <NavLink to={localizePath('/', locale)}>
            <CompanyLogo />
          </NavLink>
        </div>

      </div>
      <div className="Header__toggleIconBox">

      </div>

    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
