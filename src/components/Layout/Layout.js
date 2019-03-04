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
import FlashMessages from '../Containers/FlashMessages';
import Loader from '../UI/Loader';
import Scrim from '../UI/Scrim';

import { setWindowSize, setOpenDrawer } from '../../actions/app';
import { localizePath } from '../../localization';
import ToolBarLayer from './ToolBarLayer';
import DrawerLayer from './DrawerLayer';
import Home from './Stages/Home';
import Header from '../Header';

import './Layout.scss';
import DepartmentsCarousel from '../Containers/DepartmentsCarousel/DepartmentsCarousel';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale string . */
  locale: PropTypes.string.isRequired,
  /** On resize window to store data into redux store. */
  onWindowResize: PropTypes.func.isRequired,
  /** Current open drawer name. */
  openDrawer: PropTypes.string.isRequired,
  /** Hide panels handler. */
  onScrimClick: PropTypes.func.isRequired,
  /** Window dimensions data. */
  window: PropTypes.shape({
    /** Window height. */
    height: PropTypes.number.isRequired,
    /** Window width. */
    width: PropTypes.number.isRequired,
    /** CSS media query prefix. */
    mediaPrefix: PropTypes.string.isRequired,
    /** Device Pixel Ratio. */
    devicePixelRatio: PropTypes.number.isRequired,
  }).isRequired,

};

const Layout = ({ isBlurredContent, window, locale, onWindowResize, openDrawer, onScrimClick }) => {
  return (
    <div className="Layout">
      <WindowResizeDetect onResize={onWindowResize}/>
      <ToolBarLayer/>
      <DrawerLayer open={openDrawer}/>

      <Scrim onClick={() => onScrimClick()} isVisible={openDrawer !== ''}/>
      <Toast/>
      <FlashMessages/>
      <Loader/>

      <div className={isBlurredContent ? 'Layout__content Layout__content_blur' : 'Layout__content'}>

        <Header height={48}/>
        <DepartmentsCarousel height={80}/>

        <Switch>
          <Route
            exact
            path={localizePath('/', locale)}
            render={
              routeProps => <Home
                {...routeProps}
                window={window}
                locale={locale}
                top={48 + 80}
              />
            }
          />


          <Route exact path={localizePath('/dev', locale)} component={Container}/>
          <Route exact path={localizePath('/browse/:department', locale)} component={Browse}/>
          <Route exact path={localizePath('/login', locale)} component={Login}/>
          <PrivateRoute path={localizePath('/user', locale)} component={User}/>
        </Switch>


        <div className="Layout__footer">
          footer
        </div>
      </div>

    </div>
  );
};

Layout.propTypes = propTypes;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    openDrawer: state.app.openDrawer,
    window: state.app.window,
    isBlurredContent: state.app.content.isBlurred,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onWindowResize: data => dispatch(setWindowSize(data)),
    onScrimClick: () => dispatch(setOpenDrawer('')),
  }
);

const C = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;
