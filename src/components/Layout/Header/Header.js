/**
 * Header Component.
 * Placeholder fot the description
 * @module Header
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CompanyLogo from '../../Svg/CompanyLogo';
import CompanyLogoCompact from '../../Svg/CompanyLogoCompact';
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
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  locale: APP_DEFAULT_LOCALE,
  mediaPrefix: 'xs'
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Header = ({ locale, mediaPrefix }) => {

  return (
    <div className="Header">
      <div className="Header__logo">
        <Ripple>
          <div className="Header__logoBox">
            <NavLink to={localizePath('/', locale)}>
              {
                ['xs'].includes(mediaPrefix)
                  ? <CompanyLogoCompact height="100%"/>
                  : <CompanyLogo height="100%"/>
              }
            </NavLink>
          </div>
        </Ripple>
      </div>
      <div className="Header__search">
        <div className="Header__searchBox">
          <Search routePath="/browse"/>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
