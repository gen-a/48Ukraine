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
import Ripple from "../../UI/Ripple/Ripple";

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Height in pixels. */
  height: PropTypes.number,
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  height: 80
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
    const { height } = this.props;
    const current = 1;
    const C = Icons['IconAlcohol'];
    return (
      <>
      <Carousel
        onStartDrag={() => this.disableNavLink()}
        onEndDrag={() => this.enableNavLink()}
        slotHeight={height}
      >
        {[...Array(10)].map((v, i) => (

          <NavLink
            key={i}
            to={`/browse/${i}`}
            onClick={(e) => this.handleClick(e)}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Ripple disabled={ i === current }>

              <div
                className={i === current
                  ? 'DepartmentsCarousel__entry DepartmentsCarousel__entry_current'
                  : 'DepartmentsCarousel__entry'}
                style={{ height: `${height}px` }}
              >
                <div className="DepartmentsCarousel__icon">
                  <C viewBox="0 0 64 64" width="32px" height="32px" style={{ display: 'block' }}/>
                </div>
                <div className="DepartmentsCarousel__label">
                  Department name lllllllll
                </div>
              </div>

            </Ripple>
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
