/**
 * Application layout Component
 * Set page layout
 * @module App
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Browse from '../../pages/Browse';
import Product from '../../pages/Product';
import Cart from '../../pages/Cart';

import PrivateRoute from '../../components/PrivateRoute';
import User from '../../components/Loadables/User';
import Login from '../../pages/Login';
import GUIConnect from '../../components/Containers/GUIConnect';
import Layout from '../../components/Layout';
import { localizePath } from '../../localization/index';
import { fetchInitialSate } from '../../actions/app';
import Home from '../../pages/Home';
import SplashScreen from '../../components/SplashScreen';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale. */
  locale: PropTypes.string.isRequired,
};

/**
 * Standard route render handler
 * @param C
 */
export const renderRoute = C => routeProps => (
  <Layout
    {...routeProps}
    render={layoutProps => (
      <GUIConnect
        {...layoutProps}
        render={guiProps => <C {...guiProps} key={routeProps.match.url} />}
      />
    )}
  />
);


const App = ({ locale, callFetchInitialSate, isInitialized }) => {

  if(locale){
    setTimeout(()=> callFetchInitialSate({ locale }), 0);
  }

  if(!isInitialized){
    return <SplashScreen />;
  }

  return (
  <Switch>
    <Route exact path={localizePath('/', locale)} render={renderRoute(Home)} />
    <Route exact path={localizePath('/browse/:department', locale)} render={renderRoute(Browse)} />
    <Route exact path={localizePath('/browse/:department/page/:page', locale)} render={renderRoute(Browse)} />
    <Route exact path={localizePath('/product/:id', locale)} render={renderRoute(Product)} />
    <Route exact path={localizePath('/cart', locale)} render={renderRoute(Cart)} />
    <Route exact path={localizePath('/login', locale)} component={Login}/>
    <PrivateRoute path={localizePath('/user', locale)} component={User}/>
  </Switch>
  )


};


App.propTypes = propTypes;



const mapStateToProps = state => (
  {
    isInitialized: state.app.isInitialized
  }
);

const mapDispatchToProps = dispatch => (
  {
    callFetchInitialSate: (data) => dispatch(fetchInitialSate(data))
  }
);

const C = connect(mapStateToProps, mapDispatchToProps)(App);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;

