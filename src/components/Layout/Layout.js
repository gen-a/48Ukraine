/**
 * Application layout Component
 * Set page layout
 * @module Layout
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '../Dev/Container';
import Browse from '../Sections/Browse';
import PrivateRoute from '../PrivateRoute';
import User from '../Loadables/User';
import Login from '../Pages/Login';
import WindowResizeDetect from '../UI/Detect/WindowResize';
import Toast from '../UI/Toast';
import FlashMessage from '../UI/FlashMessage';
import Loader from '../UI/Loader';
import { setWindowSize } from '../../actions/app';
import { localizePath } from '../../localization';
import Header from '../Header';

import './Layout.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Current locale string . */
  locale: PropTypes.string.isRequired,
  /* On resize window to store data into redux store. */
  onWindowResize: PropTypes.func.isRequired,
};

const Layout = ({ locale, onWindowResize }) => {
  return (
    <>
      <WindowResizeDetect onResize={onWindowResize} />
      <header className="Layout__header">
        <Header />
      </header>
      <div className="Layout__body">
        <div className="Layout__bodyMain">
          <Switch>
            <Route exact path={localizePath('/dev', locale)} component={Container} />
            <Route exact path={localizePath('/', locale)} component={Container} />
            <Route exact path={localizePath('/browse/:department', locale)} component={Browse} />
            <Route exact path={localizePath('/login', locale)} component={Login} />
            <PrivateRoute path={localizePath('/user', locale)} component={User} />
          </Switch>
        </div>
        <div className="Layout__bodyScrim" />
        <div className="Layout__panel Layout__panel_left">
          left
        </div>
        <div className="Layout__panel Layout__panel_right">
          right
        </div>
      </div>
      <div className="Layout__footer">
        footer
      </div>
      <Toast />
      <FlashMessage />
      <Loader />
    </>
  );
};

Layout.propTypes = propTypes;

const mapStateToProps = state => (
  {
    locale: state.app.locale
  }
);

const mapDispatchToProps = dispatch => (
  {
    onWindowResize: data => dispatch(setWindowSize(data))
  }
);

const C = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />} />;
