/**
 * StoreRouteMatch Component.
 * Placeholder fot the description
 * @module StoreRouteMatch
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { setRouteMatch } from '../../../actions/app';

const propTypes = {
  /** Render function */
  render: PropTypes.func.isRequired,
  /** Call store render match handler */
  callSetRouteMatch: PropTypes.func.isRequired,
  /** Rout match data object */
  match: ReactRouterPropTypes.match.isRequired,
};

const StoreRouteMatch = ({ callSetRouteMatch, render, match, ...otherProps }) => {
  callSetRouteMatch(match);
  return render(otherProps);
};

StoreRouteMatch.propTypes = propTypes;

const mapDispatchToProps = dispatch => (
  {
    callSetRouteMatch: (value) => dispatch(setRouteMatch(value)),
  }
);

export default connect(null, mapDispatchToProps)(StoreRouteMatch);
