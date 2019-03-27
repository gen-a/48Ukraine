/**
 * UserNavigator Component.
 * Placeholder fot the description
 * @module UserNavigator
 */
import React from 'react';
import PropTypes from 'prop-types';

import './UserNavigator.scss';
import {NavLink} from 'react-router-dom';

import ProfileIcon from '../../Svg/AccountCardDetailsOutline';
import HistoryIcon from '../../Svg/History';
import ChangePassIcon from '../../Svg/Lastpass';
import LogoutIcon from '../../Svg/Logout';
import colors from '../../../_colors.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** User email. */
  email: PropTypes.string.isRequired,
  /** Log out handler. */
  callLogOut: PropTypes.func.isRequired,
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
const UserNavigator = ({ match: { path: currentRoute }, email, callLogOut }) => {
  const routes = [
    { route: '/user/profile', name: 'Персональні відомості' , icon: ProfileIcon},
    { route: '/user/orders', name: 'Історія замовлень', icon: HistoryIcon },
    { route: '/user/reset-password', name: 'Змінити пароль', icon: ChangePassIcon },
  ];

  return (
    <div className="UserNavigator">
      <div className="UserNavigator__email">
        {email}
      </div>

      <ul className="UserNavigator__entries">
        {routes.map((r) => {
          const I = r.icon;

          return (
            <li key={r.route} className="UserNavigator__node">
              {currentRoute === r.route
                ? (
                  <div className="UserNavigator__label UserNavigator__label_isSelected">
                    <div className="UserNavigator__labelIcon">
                      <I fill={colors.colorPrimaryHB}/>
                    </div>
                    <div className="UserNavigator__labelTExt">
                      {r.name}
                    </div>
                  </div>
                )
                : (

                    <NavLink
                      to={r.route}
                      className="UserNavigator__label"
                    >
                      <div className="UserNavigator__labelIcon">
                        <I fill={colors.colorPrimaryHB}/>
                      </div>
                      <div className="UserNavigator__labelTExt">
                        {r.name}
                      </div>
                    </NavLink>

                )
              }
            </li>
          );
        })}
        <li className="UserNavigator__node">
          <button
            className="UserNavigator__label"
            type="button"
            onClick={() => callLogOut()}
          >
            <div className="UserNavigator__labelIcon">
              <LogoutIcon fill={colors.colorPrimaryHB}/>
            </div>
            <div className="UserNavigator__labelTExt">
              Вийти
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

UserNavigator.propTypes = propTypes;
UserNavigator.defaultProps = defaultProps;

export default UserNavigator;
