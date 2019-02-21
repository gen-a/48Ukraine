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
import { setLocale, setWindowSize } from '../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Object of the parent path matches. */
  match: PropTypes.shape({
    params: PropTypes.shape({
      locale: PropTypes.string
    }),
  }),
  /* Function to hide Toast */
  onSetLocale: PropTypes.func,
  /* On resize window to store data into redux store. */
  onWindowResize: PropTypes.func.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  match: {
    params: {
      locale: APP_DEFAULT_LOCALE
    }
  },
  onSetLocale: console.log,
};

const Layout = ({ match, onSetLocale, onWindowResize }) => {
  const { params: { locale } } = match;
  if( locale !== APP_DEFAULT_LOCALE ){
    onSetLocale(locale);
  }
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

const mapDispatchToProps = (dispatch) => {
  return {
    onSetLocale: (data) => dispatch(setLocale(data)),
    onWindowResize: (data) => dispatch(setWindowSize(data))
  };
};

export default connect(null, mapDispatchToProps)(Layout);
