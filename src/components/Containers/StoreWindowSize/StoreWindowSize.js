/**
 * StoreWindowSize Component.
 * Placeholder fot the description
 * @module StoreWindowSize
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WindowResizeDetect from '../../UI/Detect/WindowResize/WindowResize';
import { setWindowSize } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** On resize window to store data into redux store. */
  callSetWindowSize: PropTypes.func.isRequired,
};

const StoreWindowSize = ({ callSetWindowSize }) => <WindowResizeDetect onResize={callSetWindowSize} />;

StoreWindowSize.propTypes = propTypes;

const mapDispatchToProps = dispatch => (
  {
    callSetWindowSize: data => dispatch(setWindowSize(data))
  }
);

export default connect(null, mapDispatchToProps)(StoreWindowSize);
