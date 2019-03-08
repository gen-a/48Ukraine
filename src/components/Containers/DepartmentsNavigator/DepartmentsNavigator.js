/**
 * Converting DepartmentTree to Navigator
 * @module DepartmentsNavigator
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DepartmentsTree from '../DepartmentsTree';
import { localizePath } from '../../../localization';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale. */
  locale: PropTypes.string.isRequired,
};

class DepartmentsNavigator extends Component {

  setLinks(departments) {
    const { locale } = this.props;
    const numberStyle = {
      fontSize: '0.75rem',
      margin: '0 0 0 0.5rem',
      fontWeight: '400',
      position: 'inline-block'
    };

    return departments.map(({ children, name, nameInUrl, productsQuantity }) => {
      const to = `/browse/${nameInUrl}`;
      return {
        children: this.setLinks(children),
        label: (
          <NavLink to={localizePath(to, locale)} style={{ textDecoration: 'none', display: 'block' }}>
            {name}
            <sup style={numberStyle}>
              {productsQuantity}
            </sup>
          </NavLink>
        ),
        id: nameInUrl
      };
    });
  }

  render() {
    const { props } = this;
    return <DepartmentsTree {...{ ...props, departments: this.setLinks(props.departments)}} />;
  }
}

DepartmentsNavigator.propTypes = propTypes;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments,
    currentDepartment: state.app.routeMatch.params.department || '',
  }
);

export default connect(mapStateToProps, null)(DepartmentsNavigator);
