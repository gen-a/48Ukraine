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
import Scrim from '../UI/Scrim';

import { setWindowSize, setOpenPanel } from '../../actions/app';
import { localizePath } from '../../localization';
import ToolBarLayer from './ToolBarLayer';
import DrawerLayer from './DrawerLayer';

import Header from '../Header';
import Carousel from '../UI/Carousel';

import './Layout.scss';


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

  let blur = openPanel !== '';

  return (
    <div className="Layout">
      <WindowResizeDetect onResize={onWindowResize} />
      <ToolBarLayer />
      <DrawerLayer open={openPanel} />
      <Scrim onClick={() => onScrimClick()} isVisible={openPanel !== ''}/>

      <div className={ blur ? 'Layout__content Layout__content_blur' : 'Layout__content' }>
        <header className="Layout__header">
          <Header />
        </header>
        <div className="Layout__body">
          <div className="Layout__bodyMain">
            <Carousel/>
            <Switch>
              <Route exact path={localizePath('/dev', locale)} component={Container}/>
              <Route exact path={localizePath('/', locale)} component={Container}/>
              <Route exact path={localizePath('/browse/:department', locale)} component={Browse}/>
              <Route exact path={localizePath('/login', locale)} component={Login}/>
              <PrivateRoute path={localizePath('/user', locale)} component={User}/>
            </Switch>
          </div>
        </div>
        <div className="Layout__footer">
          footer
        </div>
      </div>

      <Toast/>
      <FlashMessage/>
      <Loader/>
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
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;
