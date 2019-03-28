/**
 * Converting DepartmentTree to Navigator
 * @module DepartmentsNavigator
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import DepartmentsTree from '../DepartmentsTree';
import { localizePath } from '../../../localization';
import Icons from '../../Svg/Departments';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale. */
  locale: PropTypes.string.isRequired,
  /** Route match data object. */
  match: PropTypes.shape({
    /** Extracted from url params. */
    params: PropTypes.shape({
      department: PropTypes.string
    }),
    /** Url name. */
    url: PropTypes.string,
    /** Route path. */
    path: PropTypes.string,
  }).isRequired,
  /** Array of departments. */
  departments: PropTypes.arrayOf(PropTypes.shape({
    /** Icon of the department. */
    icon: PropTypes.string,
    /** Department name. */
    name: PropTypes.string,
    /** Name in url (slug). */
    nameInUrl: PropTypes.string,
  })),
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  departments: []
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

    return departments.map(({ children, name, nameInUrl, icon, productsQuantity }) => {
      const to = `/browse/${nameInUrl}`;
      const C = icon ? Icons[icon]: null;
      return {
        children: this.setLinks(children),
        label: (
          <NavLink to={localizePath(to, locale)} style={{ textDecoration: 'none', display: 'block' }}>
            {C && (
              <div style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '1rem'}}>
                <C viewBox="0 0 64 64" width="32px" height="32px" style={{ display: 'block' }}/>
              </div>
            )}

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
    const { match: { params: { department: currentDepartment } }, departments } = this.props;
    return <div className="DepartmentsTree"><DepartmentsTree {...{ currentDepartment, departments: this.setLinks(departments)}} /></div>;
  }
}

DepartmentsNavigator.propTypes = propTypes;
DepartmentsNavigator.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments
  }
);

const C = connect(mapStateToProps, null)(DepartmentsNavigator);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />} />;

