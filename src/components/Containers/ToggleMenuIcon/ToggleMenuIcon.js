/**
 * Container of the menu toggle
 * @module ToggleMenuIcon
 */
import React from 'react';
import { connect } from 'react-redux';
import ToggleIcon from '../../UI/ToogleIcon';
import IconMenu from '../../Svg/IconMenu';
import { setOpenPanel } from '../../../actions/app';

const ToggleMenuIcon = props => <ToggleIcon {...props} svg={<IconMenu />} size={32} />;

const mapStateToProps = state => (
  {
    isOn: state.app.openPanel === 'menu',
  }
);
const mapDispatchToProps = dispatch => (
  {
    onChange: (value) => dispatch(setOpenPanel(value ? 'menu' : '')),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ToggleMenuIcon);
