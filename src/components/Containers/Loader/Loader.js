/**
 * Loader Component.
 * Placeholder fot the description
 * @module Loader
 */
import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../UI/Loader';

const mapStateToProps = state => (
  {
    isVisible: state.app.loader.isActive
  }
);

export default connect(mapStateToProps, null)(Loader);
