/**
 * UserNavigator Component.
 * Placeholder fot the description
 * @module UserNavigator
 */
import React from 'react';
import PropTypes from 'prop-types';

import './UserNavigator.scss';
import NavLink from "react-router-dom/es/NavLink";

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** User email. */
  email: PropTypes.string.isRequired,
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
const UserNavigator = ({match:{path:currentRoute}, email}) => {
  const routes = [
    { route: '/user/profile', name: 'Profile' },
    { route: '/user/orders', name: 'Orders History' },
    { route: '/user/logout', name: 'LogOut' },
  ];

  return (
    <div className="UserNavigator">
      <div className="UserNavigator__email">
        {email}
      </div>

      <ul className="UserNavigator__entries">
        {routes.map((r) => {
          return (
            <li key={r.route} className="UserNavigator__node">
              {currentRoute === r.route
                ? (
                  <div className="UserNavigator__label UserNavigator__label_isSelected">
                    <span>
                      {r.name}
                    </span>
                  </div>
                )
                : (
                  <div className="UserNavigator__label">
                    <NavLink
                      to={r.route}
                    >
                      {r.name}
                    </NavLink>
                  </div>
                )
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

UserNavigator.propTypes = propTypes;
UserNavigator.defaultProps = defaultProps;

export default UserNavigator;
