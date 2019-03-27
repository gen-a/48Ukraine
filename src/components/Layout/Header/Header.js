/**
 * Header Component.
 * Placeholder fot the description
 * @module Header
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CompanyLogo, { ASPECT_RATIO } from '../../Svg/CompanyLogo';
import { localizePath, APP_DEFAULT_LOCALE } from '../../../localization/index';
import Ripple from '../../UI/Ripple';
import Search from '../../Containers/Search';
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
    <div className="Header">
      <div className="Header__logo">
        <Ripple>
          <div className="Header__logoBox">
            <NavLink to={localizePath('/', locale)}>
              <CompanyLogo height="100%"/>
            </NavLink>
          </div>
        </Ripple>
      </div>
      <div className="Header__search">
        <div className="Header__searchBox">
          <Search routePath="/browse" />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
