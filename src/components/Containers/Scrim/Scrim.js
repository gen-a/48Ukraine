/**
 * Scrim Component.
 * Placeholder fot the description
 * @module Scrim
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Scrim from '../../UI/Scrim';
import { addOpenScrim, removeOpenScrim } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Visbility status. */
  isVisible: PropTypes.bool,
  /** On click handler. */
  onClick: PropTypes.func,
  /** Z-index. */
  depth: PropTypes.number,
  /** ID of the scrim. */
  id: PropTypes.string.isRequired,
  /** Register open scrim handler. */
  callAddOpenScrim: PropTypes.func.isRequired,
  /** Unregister open scrim handler. */
  callRemoveOpenScrim: PropTypes.func.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  isVisible: false,
  depth: 30,
  onClick: () => {
  }
};

const C = (props) => {

  useEffect(() => {
    const { id, isVisible, callAddOpenScrim, callRemoveOpenScrim } = props;
    if (isVisible) {
      callAddOpenScrim(id);
    } else {
      callRemoveOpenScrim(id);
    }
  });

  return <Scrim {...props} />;
};

C.propTypes = propTypes;
C.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => (
  {
    callAddOpenScrim: id => dispatch(addOpenScrim(id)),
    callRemoveOpenScrim: id => dispatch(removeOpenScrim(id)),
  }
);

export default connect(null, mapDispatchToProps)(C);
