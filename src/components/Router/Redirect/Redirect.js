import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addFlashMessage } from '../../../actions/app';


const C = ({ to, message, callAddFlashMessage }) => {

  useEffect(() => {
    const { body, title, type } = message;
    if (body) {
      callAddFlashMessage(body, title, type);
    }
  });

  return <Redirect to={to} />;
};

const mapDispatchToProps = dispatch => (
  {
    callAddFlashMessage: (body, title, type) => dispatch(addFlashMessage(body, title, type)),
  }
);

export default connect(null, mapDispatchToProps)(C);
