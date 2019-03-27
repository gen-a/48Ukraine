/**
 * Search Component.
 * Placeholder fot the description
 * @module Search
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Search from '../../Search';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Filters. */
  currentDepartment: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
};

const C = ({ currentDepartment, ...otherProps }) => {
  return (
    <Search
      {...otherProps}
      filters={currentDepartment.nameInUrl
        ? [{
          name: 'department',
          label: currentDepartment.name,
          value: currentDepartment.nameInUrl,
          selected: true
        }]
        : []}
    />
  );
};

C.propTypes = propTypes;

const mapStateToProps = state => (
  {
    currentDepartment: state.app.currentDepartment
  }
);

const D = connect(mapStateToProps, null)(C);
export default props => <Route render={routeProps => <D {...routeProps} {...props} />}/>;