import { connect } from 'react-redux';
import Client from './Client';

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.user.isAuthenticated ? 'foo' : 'bar'
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    auth: (data) => dispatch({ type: "FFOOOO", payload: data })
  }
};

const ReduxConnect = connect(mapStateToProps, mapDispatchToProps)(Client);

export default ReduxConnect;
