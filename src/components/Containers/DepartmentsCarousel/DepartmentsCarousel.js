/**
 * DepartmentsCarousel Component.
 * Placeholder fot the description
 * @module DepartmentsCarousel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from '../../UI/Carousel';
import NavLink from 'react-router-dom/es/NavLink';
import { localizePath } from '../../../localization/index';

import Icons from '../../Svg/Departments';
import './DepartmentsCarousel.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Height in pixels. */
  height: PropTypes.number,
  /** Width in pixels. */
  width: PropTypes.number,
  /** Array of departments. */
  departments: PropTypes.arrayOf(PropTypes.shape({
    /** Icon of the department. */
    icon: PropTypes.string,
    /** Department name. */
    name: PropTypes.string,
    /** Name in url (slug). */
    nameInUrl: PropTypes.string,
  })),
  /** Current locale. */
  locale: PropTypes.string.isRequired,
  /** Current department. */
  currentDepartment: PropTypes.string.isRequired,
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  height: 80,
  width: 200,
  departments: [],
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class DepartmentsCarousel extends Component {
  constructor(props) {
    super(props);
    this.blockNavLink = false;
    this.state = {
      blockNavLink: false
    };
  }

  disableNavLink() {
    this.setState(prevState => ({
      ...prevState,
      blockNavLink: true,
    }));
  }

  enableNavLink() {
    this.setState(prevState => ({
      ...prevState,
      blockNavLink: false,
    }));
  }

  handleClick(e) {
    const { blockNavLink } = this.state;
    if (blockNavLink) {
      e.preventDefault();
    }
  }


  render() {
    const { height, width, departments, locale, currentDepartment } = this.props;

    const nodes = departments.map(({ icon, name, nameInUrl }) => {
      if (!icon) {
        return null;
      }
      const C = Icons[icon];
      return {
        key: nameInUrl,
        node:
          (
            <NavLink
              to={localizePath(`/browse/${nameInUrl}`, locale)}
              onClick={(e) => this.handleClick(e)}
              style={{ textDecoration: 'none', color: 'white' }}
              key={nameInUrl}
            >
              <div
                className={nameInUrl === currentDepartment
                  ? 'DepartmentsCarousel__entry DepartmentsCarousel__entry_current'
                  : 'DepartmentsCarousel__entry'}
                style={{ height: `${height}px`, width: `${width}px` }}
              >
                <div className="DepartmentsCarousel__icon">
                  <C viewBox="0 0 64 64" width="32px" height="32px" style={{ display: 'block' }}/>
                </div>
                <div className="DepartmentsCarousel__label">
                  {name}
                </div>
              </div>
            </NavLink>
          )
      };
    }).filter(d => d !== null);

    return (
      <Carousel
        onStartDrag={() => this.disableNavLink()}
        onEndDrag={() => this.enableNavLink()}
        slotHeight={height}
        nodes={nodes}
      />

    );
  }
}

DepartmentsCarousel.propTypes = propTypes;
DepartmentsCarousel.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.rootDepartments,
    currentDepartment: state.app.routeMatch.params.department || '',
  }
);

export default connect(mapStateToProps, null)(DepartmentsCarousel);