import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { addFlashMessage } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Path to redirect. */
  to: PropTypes.string.isRequired,
  /** Flash message to display. */
  message: PropTypes.shape({
    body: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  /** Add flsh message function. */
  callAddFlashMessage: PropTypes.func.isRequired,
};



const R = ({ to, message, callAddFlashMessage}) => {

  useEffect(() => {
    const { body, title, type } = message;
    if (body) {
      callAddFlashMessage(body, title, type);
    }
  });

  return <Redirect to={to} />;
};

R.propTypes = propTypes;

const mapDispatchToProps = dispatch => (
  {
    callAddFlashMessage: (body, title, type) => dispatch(addFlashMessage(body, title, type)),
  }
);

const C = connect(null, mapDispatchToProps)(R);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;
