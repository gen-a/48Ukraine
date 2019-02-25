/**
 * Container of the menu toggle
 * @module ToggleMenuIcon
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToggleIcon from '../../UI/ToogleIcon';
import { setOpenPanel } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Name of the linked panel. */
  name: PropTypes.string.isRequired,
  /** Name of the current open panel. */
  openPanel: PropTypes.string.isRequired,
  /** Onchange handler. */
  onChange: PropTypes.func.isRequired,
  /** Image of the icon. */
  svg: PropTypes.node.isRequired,
};

const TogglePanel = (props) => {
  const { name, openPanel, onChange, svg } = props;
  return (
    <ToggleIcon
      {...props}
      isOn={openPanel === name}
      onChange = {(value)=> onChange(value ? name : '')}
      svg={svg}
    />
  );
};

TogglePanel.propTypes = propTypes;

const mapStateToProps = state => (
  {
    openPanel: state.app.openPanel,
  }
);
const mapDispatchToProps = dispatch => (
  {
    onChange: (value) => dispatch(setOpenPanel(value)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TogglePanel);
