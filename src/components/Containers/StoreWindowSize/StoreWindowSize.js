/**
 * StoreWindowSize Component.
 * Placeholder fot the description
 * @module StoreWindowSize
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WindowResizeDetect from '../../UI/Events/WindowResize';
import { setWindowSize } from '../../../actions/app';
import { mediaPrefixes } from '../../../_settings';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** On resize window to store data into redux store. */
  callSetWindowSize: PropTypes.func.isRequired,
};

const StoreWindowSize = ({ callSetWindowSize }) => (
  <WindowResizeDetect mediaPrefixes={mediaPrefixes} onResize={callSetWindowSize} />
);

StoreWindowSize.propTypes = propTypes;

const mapDispatchToProps = dispatch => (
  {
    callSetWindowSize: data => dispatch(setWindowSize(data))
  }
);

export default connect(null, mapDispatchToProps)(StoreWindowSize);
