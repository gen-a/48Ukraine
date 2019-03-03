/**
 * DepartmentsCarousel Component.
 * Placeholder fot the description
 * @module DepartmentsCarousel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../../UI/Carousel';
import NavLink from 'react-router-dom/es/NavLink';

import Icons from '../../Svg/Departments';
import './DepartmentsCarousel.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class DepartmentsCarousel extends Component {
  constructor(props) {
    super(props);
    this.blockNavLink = false;
  }

  disableNavLink() {
    this.blockNavLink = true;
  }

  enableNavLink() {
    this.blockNavLink = false;
  }

  handleClick(e) {
    if (this.blockNavLink) {
      e.preventDefault();
    }
  }


  render() {
    const current =1;
    const C = Icons['IconAlcohol'];
    return (
      <>
      <Carousel
        onStartDrag={() => this.disableNavLink()}
        onEndDrag={() => this.enableNavLink()}
        slotHeight={80}
      >
        {[...Array(10)].map((v, i) => (

          <NavLink
            key={i}
            to={`/browse/${i}`}
            onClick={(e) => this.handleClick(e)}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div
              className={i === current
                ? 'DepartmentsCarousel__entry DepartmentsCarousel__entry_current'
                : 'DepartmentsCarousel__entry'}
              style={{height:`${80}px`}}
            >
              <div className="DepartmentsCarousel__icon">
                <C viewBox="0 0 64 64" width="32px" height="32px" style={{ display: 'block' }}/>
              </div>
              <div className="DepartmentsCarousel__label">
                Department name lllllllll
              </div>
            </div>
          </NavLink>

        ))}
      </Carousel>
      </>
    );
  }
}

DepartmentsCarousel.propTypes = propTypes;
DepartmentsCarousel.defaultProps = defaultProps;

export default DepartmentsCarousel;
