/**
 * Layout Component
 * Set page layout
 * @module Layout
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Toast from '../UI/Toast';
import FlashMessages from '../Containers/FlashMessages';
import Loader from '../Containers/Loader';
import StoreWindowSize from '../Containers/StoreWindowSize';

import ToolBarLayer from './ToolBarLayer';
import DrawerLayer from './DrawerLayer';
import Header from './Header';
import { storeScrollData } from '../../actions/app';
import './Layout.scss';
import DepartmentsCarousel from '../Containers/DepartmentsCarousel';
import ShoppingCart from '../Containers/ShoppingCart/ShoppingCart';
import { localizePath } from "../../localization/index";

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Scroll data by event collector. */
  callStoreScrollData: PropTypes.func.isRequired,
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
  const { window } = otherProps;
  return (
    <div className="Layout">
      <StoreWindowSize />

      <ToolBarLayer />
      <DrawerLayer />
      <Toast />
      <FlashMessages />
      <Loader />

      <div className="Layout__content" onScroll={otherProps.callStoreScrollData}>
        <Header height={['xs', 'sm', 'md'].includes(window.mediaPrefix) ? 48 : 64} />
        <DepartmentsCarousel height={['xs', 'sm', 'md'].includes(window.mediaPrefix) ? 80 : 64} />
        <div className="Layout__contentBox">
          { render(otherProps) }
        </div>
      </div>

      <div className="Layout__footer">
        footer
      </div>
      <ShoppingCart link={localizePath('/cart', otherProps.locale)}/>
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

const mapDispatchToProps = dispatch => (
  {
    callStoreScrollData: message => dispatch(storeScrollData(message)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
