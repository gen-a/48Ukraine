/**
 * Main Application Component.
 * Store locale detected current locale and render Layout
 * @module App
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import Localize from './localization/Localize';
import { setLocale } from './actions/app';

import './App.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Function to store into redux current locale */
  onSetLocale: PropTypes.func.isRequired,
};

const App = ({ onSetLocale }) => (
  <Localize onSetLocale={onSetLocale}>
    <Layout />
  </Localize>
);

App.propTypes = propTypes;

const mapDispatchToProps = dispatch => (
  {
    onSetLocale: data => dispatch(setLocale(data))
  }
);

export default connect(null, mapDispatchToProps)(App);

