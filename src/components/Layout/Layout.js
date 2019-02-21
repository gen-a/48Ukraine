/**
 * Application layout Component
 * Detect locale from the parent route and set page layout
 * @module Layout
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '../Dev/Container';
import PrivateRoute from '../PrivateRoute';
import User from '../Loadables/User';
import Login from '../Pages/Login';
import WindowResizeDetect from '../UI/Detect/WindowResize';
import Toast from '../UI/Toast';
import SystemMessage from '../UI/SystemMessage';
import Loader from '../UI/Loader';
import { APP_DEFAULT_LOCALE, localizePath } from '../../localization';
import { setWindowSize } from '../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Current locale string . */
  locale: PropTypes.string,
  /* On resize window to store data into redux store. */
  onWindowResize: PropTypes.func.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  locale: APP_DEFAULT_LOCALE
};

const Layout = ({ locale, onWindowResize }) => {
  return (
    <>
      <WindowResizeDetect onResize={onWindowResize} />
      <Switch>
        <Route exact path={localizePath('/dev', locale)} component={Container} />
        <Route exact path={localizePath('/', locale)} component={Container} />
        <Route exact path={localizePath('/login', locale)} component={Login} />
        <PrivateRoute path={localizePath('/user', locale)} component={User} />
      </Switch>
      <Toast />
      <SystemMessage />
      <Loader />
    </>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    locale: state.app.locale
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onWindowResize: (data) => dispatch(setWindowSize(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
