/**
 * Layout Component
 * Set page layout
 * @module Layout
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Toast from '../UI/Toast/Toast';
import FlashMessages from '../Containers/FlashMessages/FlashMessages';
import Loader from '../UI/Loader/Loader';
import StoreWindowSize from '../Containers/StoreWindowSize';

import ToolBarLayer from './ToolBarLayer';
import DrawerLayer from './DrawerLayer';
import Header from './Header';

import './Layout.scss';
import DepartmentsCarousel from '../Containers/DepartmentsCarousel';
import ShoppingCart from '../Containers/ShoppingCart/ShoppingCart';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Window dimensions data. */
  window: PropTypes.shape({
    /** Window height. */
    height: PropTypes.number.isRequired,
    /** Window width. */
    width: PropTypes.number.isRequired,
    /** CSS media query prefix. */
    mediaPrefix: PropTypes.string.isRequired,
    /** Device Pixel Ratio. */
    devicePixelRatio: PropTypes.number.isRequired,
  }).isRequired,
  /** Render function */
  render: PropTypes.func.isRequired,
};

const Layout = ({ render, ...otherProps }) => {
  return (
    <div className="Layout">
      <StoreWindowSize />

      <ToolBarLayer />
      <DrawerLayer />
      <Toast />
      <FlashMessages />
      <Loader />

      <div className="Layout__content">
        <Header height={48} />
        <DepartmentsCarousel height={80} />
        { render(otherProps) }
      </div>
      <div className="Layout__footer">
        footer
      </div>
      <ShoppingCart />
    </div>
  );
};

Layout.propTypes = propTypes;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    window: state.app.window,
  }
);

export default connect(mapStateToProps, null)(Layout);
