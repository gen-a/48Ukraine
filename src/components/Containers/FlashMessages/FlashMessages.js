/**
 * FlashMessages Component.
 * Placeholder fot the description
 * @module FlashMessages
 */
import React from 'react';
import { connect } from 'react-redux';
import FlashMessages from '../../UI/FlashMessages';
import { removeFlashMessage, removeAllFlashMessages  } from '../../../actions/app';

const mapStateToProps = state => (
  {
    data: state.app.flashMessages,
  }
);
const mapDispatchToProps = dispatch => (
  {
    callRemoveFlashMessage: id => dispatch(removeFlashMessage(id)),
    callRemoveAllFlashMessages: () => dispatch(removeAllFlashMessages()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages);
