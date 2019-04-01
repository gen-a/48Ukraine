/**
 * Loader Component.
 * Placeholder fot the description
 * @module Loader
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Flag if user is authenticated */
  isAuthenticated: PropTypes.bool.isRequired,
  /** Render function */
  render: PropTypes.func.isRequired,
};

const IsAuthenticated = ({render, isAuthenticated, ...otherProps}) =>{
  return render({...otherProps, isAuthenticated});
};


IsAuthenticated.propTypes = propTypes;

const mapStateToProps = state => (
  {
    isAuthenticated: state.user.isAuthenticated
  }
);

export default connect(mapStateToProps, null)(IsAuthenticated);
