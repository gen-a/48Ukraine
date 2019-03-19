/**
 * Application layout Component
 * Set page layout
 * @module App
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Browse from '../../pages/Browse';
import Product from '../../pages/Product';
import Cart from '../../pages/Cart';

import PrivateRoute from '../../components/Router/PrivateRoute';
import Checkout from '../../pages/Checkout';
import EnterAccount from '../../pages/EnterAccount';
import GUIConnect from '../../components/Containers/GUIConnect';
import DictionaryConnect from '../../components/Containers/DictionaryConnect';

import Layout from '../../components/Layout';
import { localizePath } from '../../localization/index';
import { fetchInitialSate, setOpenDrawer } from '../../actions/app';
import Home from '../../pages/Home';
import Loader from '../../components/UI/Loader';
import SplashScreen from '../../pages/SplashScreen';
import NotFound from '../../pages/NotFound';

import AsyncComponent from '../../components/Async/AsyncComponent';

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
  <DictionaryConnect
    {...routeProps}
    render={dictionaryProps => (
      <Layout
        {...dictionaryProps}
        render={layoutProps => (
          <GUIConnect
            {...layoutProps}
            render={guiProps => <C {...guiProps} key={routeProps.match.url}/>}
          />
        )}
      />
    )}
  />
);


class App extends Component{

  constructor(props){
    super(props);
    this.location = '';
  }

  componentDidMount(){
    const {locale, callFetchInitialSate, location} = this.props;
    callFetchInitialSate({ locale });
    this.location = location;
  }

  componentDidUpdate(){
    const { location, callSetOpenDrawer} = this.props;
    if(location !== this.location){
      callSetOpenDrawer('');
    }
  }

  render(){
    const { locale, isInitialized } = this.props;

    if (!isInitialized) {
      return <SplashScreen/>;
    }

    return (
      <Switch>
        <Route exact path={localizePath('/', locale)} render={renderRoute(Home)}/>
        <Route exact path={localizePath('/browse/:department', locale)} render={renderRoute(Browse)}/>
        <Route exact path={localizePath('/browse/:department/page/:page', locale)} render={renderRoute(Browse)}/>
        <Route exact path={localizePath('/product/:id', locale)} render={renderRoute(Product)}/>
        <Route exact path={localizePath('/cart', locale)} render={renderRoute(Cart)}/>
        <Route exact path={localizePath('/checkout', locale)} render={renderRoute(Checkout)}/>
        <Route exact path={localizePath('/enter-account/:visa', locale)} render={renderRoute(EnterAccount)}/>
        <PrivateRoute
          path={localizePath('/user/:section', locale)}
          render={(routeProps)=>(
            <DictionaryConnect
              {...routeProps}
              render={dictionaryProps => (
                <Layout
                  {...dictionaryProps}
                  render={layoutProps => (
                    <GUIConnect
                      {...layoutProps}
                      render={guiProps => (
                        <AsyncComponent
                          {...guiProps}
                          key={routeProps.match.url}
                          component={()=> import('../../pages/User')}
                          placeholder={<Loader isVisible/>}
                        />
                      )}
                    />
                  )}
                />
              )}
            />
          )}
        />
        <Route path="*" render={renderRoute(NotFound)} />
      </Switch>
    )
  }
}

App.propTypes = propTypes;


const mapStateToProps = state => (
  {
    isInitialized: state.app.isInitialized,
  }
);

const mapDispatchToProps = dispatch => (
  {
    callFetchInitialSate: (data) => dispatch(fetchInitialSate(data)),
    callSetOpenDrawer: (data) => dispatch(setOpenDrawer(data)),
  }
);

const C = connect(mapStateToProps, mapDispatchToProps)(App);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;

