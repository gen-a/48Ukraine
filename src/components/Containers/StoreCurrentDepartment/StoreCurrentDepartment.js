/**
 * StoreWindowSize Component.
 * Placeholder fot the description
 * @module StoreWindowSize
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import { setCurrentDepartment } from '../../../actions/app';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** On resize window to store data into redux store. */
  callSetCurrentDepartment: PropTypes.func.isRequired,
  /** Array of departments. */
  departments: PropTypes.arrayOf(PropTypes.shape({
    /** Icon of the department. */
    icon: PropTypes.string,
    /** Department name. */
    name: PropTypes.string,
    /** Name in url (slug). */
    nameInUrl: PropTypes.string,
  })).isRequired,
  /** Match parameters */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Location object of Route. */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired
};

class StoreCurrentDepartment extends Component {

  componentDidMount() {
    this.setCurrentDepartment();
  }

  componentDidUpdate() {
    this.setCurrentDepartment();
  }

  setCurrentDepartment() {
    const { location: { search }, match: { params }, departments, callSetCurrentDepartment } = this.props;
    const values = queryString.parse(search);
    const nameInUrl = { ...values, ...params }.department;

    const found = departments.filter(department => department.nameInUrl === nameInUrl);
    callSetCurrentDepartment(found.length ? found[0] : {});

  }


  render() {
    return null;
  }
}

StoreCurrentDepartment.propTypes = propTypes;

const mapStateToProps = state => (
  {
    departments: state.app.departments,
  }
);
const mapDispatchToProps = dispatch => (
  {
    callSetCurrentDepartment: data => dispatch(setCurrentDepartment(data))
  }
);
const C = connect(mapStateToProps, mapDispatchToProps)(StoreCurrentDepartment);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;