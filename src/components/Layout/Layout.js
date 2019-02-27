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
import DepartmentsNavigator from '../Containers/DepartmentsNavigator';
import ScrollBox from '../UI/ScrollBox';
import { setWindowSize, setOpenPanel } from '../../actions/app';
import { localizePath } from '../../localization';
import Header from '../Header';

import './Layout.scss';
import AuthenticationForm from "../Forms/AuthenticationForm/AuthenticationForm";

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale string . */
  locale: PropTypes.string.isRequired,
  /** On resize window to store data into redux store. */
  onWindowResize: PropTypes.func.isRequired,
  /** Current open panel name. */
  openPanel: PropTypes.string.isRequired,
  /** Hide panels handler. */
  onScrimClick: PropTypes.func.isRequired,
};

const Layout = ({ locale, onWindowResize, openPanel, onScrimClick }) => {

  let bodyClassName = 'Layout';
  if (openPanel !== '') {
    bodyClassName += ` Layout_${openPanel}` ;
  }

  return (
    <div className={bodyClassName}>
      <WindowResizeDetect onResize={onWindowResize} />
      <header className="Layout__header">
        <Header />
      </header>
      <div className="Layout__body">
        <div className="Layout__bodyMain">
          <div className="Layout__scrim" onClick={() => onScrimClick()} />
          <div className="Layout__panel Layout__panel_left">

              <ScrollBox>
                  <DepartmentsNavigator />
              </ScrollBox>
              <div style={{ position: 'absolute', height: '100%', width: '100%', left:0 }}></div>
          </div>
          <Switch>
            <Route exact path={localizePath('/dev', locale)} component={Container} />
            <Route exact path={localizePath('/', locale)} component={Container} />
            <Route exact path={localizePath('/browse/:department', locale)} component={Browse} />
            <Route exact path={localizePath('/login', locale)} component={Login} />
            <PrivateRoute path={localizePath('/user', locale)} component={User} />
          </Switch>
        </div>
        <div className="Layout__panel Layout__panel_right">
          <AuthenticationForm />
        </div>
      </div>
      <div className="Layout__footer">
        footer
      </div>
      <Toast />
      <FlashMessage />
      <Loader />
    </div>
  );
};

Layout.propTypes = propTypes;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    openPanel: state.app.openPanel,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onWindowResize: data => dispatch(setWindowSize(data)),
    onScrimClick: () => dispatch(setOpenPanel('')),
  }
);

const C = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />} />;
