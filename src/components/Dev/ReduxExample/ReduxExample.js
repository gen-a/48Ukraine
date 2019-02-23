import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_IS_AUTHENTICATED } from '../../../actions/user';
import { importDictionaryArticles } from '../../../actions/dictionary';

const propTypes = {
  isAuthenticated: PropTypes.bool
};

const defaultProps = {
  isAuthenticated: false
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */


const ReduxExample = ({ auth, isAuthenticated, importDictionary }) => {
  importDictionary();
  return (
  <div className="reduxExample">
    {isAuthenticated && 'is authenticated'}
    {isAuthenticated || 'is not authenticated'}
    <button onClick={() => auth( !isAuthenticated )}>change</button>
  </div>
)};

ReduxExample.propTypes = propTypes;
ReduxExample.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (data) => dispatch({ type: SET_IS_AUTHENTICATED, payload: data }),
    importDictionary: () => dispatch(importDictionaryArticles('ru')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxExample);
