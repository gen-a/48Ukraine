/**
 * ToolBar Component.
 * Call onChange function
 * @module ToolBar
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DepartmentsNavigator from '../../Containers/DepartmentsNavigator';
import UserNavigator from '../../Containers/UserNavigator';
import DictionaryConnect from '../../Containers/DictionaryConnect';
import ScrollBox from '../../UI/ScrollBox';
import Authentication from '../../Widgets/Authentication';
import Drawer from '../../UI/Drawer';
import Scrim from '../../Containers/Scrim';
import { setOpenDrawer } from '../../../actions/app';
import { setAuthenticatedUser } from '../../../actions/user';
import SwipeDetect from '../../../utils/events/swipe';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Position on the screen. */
  openDrawer: PropTypes.oneOf(['', 'menu', 'user']),
  /** Function to change open drawer. */
  callSetOpenDrawer: PropTypes.func.isRequired,
  /** Is authenticated user plan. */
  isAuthenticated: PropTypes.bool,
  /** On successful login handler. */
  callSetAuthenticatedUser: PropTypes.func.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  openDrawer: '',
  isAuthenticated: false
};

const DrawerLayer = ({ callSetOpenDrawer, callSetAuthenticatedUser, isAuthenticated, openDrawer }) => {

  const leftDrawerSwipeDetect = new SwipeDetect();
  leftDrawerSwipeDetect.onSwipe = (e) => {
    if (e.direction === 'left') {
      callSetOpenDrawer('');
    }
  };
  const rightDrawerSwipeDetect = new SwipeDetect();
  rightDrawerSwipeDetect.onSwipe = (e) => {
    if (e.direction === 'right') {
      callSetOpenDrawer('');
    }
  };

  return (
    <>
      <Scrim id="DrawerLayer" onClick={() => callSetOpenDrawer('')} isVisible={openDrawer !== ''}/>
      <div
        onTouchStart={e => leftDrawerSwipeDetect.start(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={e => leftDrawerSwipeDetect.move(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={e => leftDrawerSwipeDetect.end(e)}
      >
        <Drawer position="left" depth={50} isOpen={openDrawer === 'menu'} header="Відділи">
          <ScrollBox>
            <div style={{ paddingRight: '16px' }}>
              <DepartmentsNavigator/>
            </div>
          </ScrollBox>
        </Drawer>
      </div>
      <div
        onTouchStart={e => rightDrawerSwipeDetect.start(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={e => rightDrawerSwipeDetect.move(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={e => rightDrawerSwipeDetect.end(e)}
      >
        <Drawer position="right" depth={50} isOpen={openDrawer === 'user'} header="Дані користувача">
          {isAuthenticated
            ? <UserNavigator/>
            : (
              <DictionaryConnect
                render={props => (
                  <Authentication {...props} onLogIn={e => callSetAuthenticatedUser(e)}/>
                )}
              />
            )
          }
        </Drawer>
      </div>
    </>
  );
};

DrawerLayer.defaultProps = defaultProps;
DrawerLayer.propTypes = propTypes;

const mapStateToProps = state => (
  {
    openDrawer: state.app.openDrawer,
    isAuthenticated: state.user.isAuthenticated,
  }
);

const mapDispatchToProps = dispatch => (
  {
    callSetOpenDrawer: name => dispatch(setOpenDrawer(name)),
    callSetAuthenticatedUser: data => dispatch(setAuthenticatedUser(data)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerLayer);

