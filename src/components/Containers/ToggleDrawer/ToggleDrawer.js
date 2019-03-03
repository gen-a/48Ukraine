/**
 * Container of the menu toggle
 * @module ToggleMenuIcon
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToggleIcon from '../../UI/ToogleIcon';
import { setOpenDrawer } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Name of the linked panel. */
  name: PropTypes.string.isRequired,
  /** Name of the current open panel. */
  openDrawer: PropTypes.string.isRequired,
  /** Onchange handler. */
  onChange: PropTypes.func.isRequired,
  /** Image of the icon. */
  svg: PropTypes.node.isRequired,
};

const ToggleDrawer = (props) => {
  const { name, openDrawer, onChange, svg } = props;
  return (
    <ToggleIcon
      {...props}
      isOn={openDrawer === name}
      onChange={value => onChange(value ? name : '')}
      svg={svg}
    />
  );
};

ToggleDrawer.propTypes = propTypes;

const mapStateToProps = state => (
  {
    openDrawer: state.app.openDrawer,
  }
);
const mapDispatchToProps = dispatch => (
  {
    onChange: value => dispatch(setOpenDrawer(value)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ToggleDrawer);
