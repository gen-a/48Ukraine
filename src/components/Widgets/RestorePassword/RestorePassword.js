/**
 * RestorePassword Component.
 * Placeholder fot the description
 * @module RestorePassword
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '../../UI/MaterialUI' ;
import { URL_AUTH_RESTORE_PASSWORD } from '../../../config/api';
import { post } from '../../../services/ajax';
import { translate } from '../../../localization';
import './RestorePassword.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call add flash message handler. */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** User account Email. */
  email: PropTypes.string.isRequired,
  /** Render function */
  dictionary: PropTypes.shape({}).isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class RestorePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: false
    };
  }

  sendRequestAccess() {
    const { email } = this.props;
    this.setState(prevState => ({ ...prevState, busy: true }));
    post(
      URL_AUTH_RESTORE_PASSWORD,
      { email },
      this.handleSendRequestAccessResult.bind(this)
    );
  }

  handleSendRequestAccessResult(response) {
    this.setState(prevState => ({ ...prevState, busy: false }));
    const { error, data, message } = response;
    const { callAddFlashMessage, dictionary } = this.props;
    callAddFlashMessage(
      translate(dictionary, message, data),
      translate(dictionary, 'flashMessage.title.serverMessage', data),
      error === 0 ? 'info' : 'error'
    );
  }


  render() {
    const { busy } = this.state;
    return (
      <div className="RestorePassword">
        <button
          type="button"
          className="RestorePassword__restoreButton"
          onClick={() => this.sendRequestAccess()}
          disabled={busy}
        >
          Restore forgotten password
          {busy && <CircularProgress/>}
        </button>
      </div>
    );
  }
}

RestorePassword.propTypes = propTypes;
RestorePassword.defaultProps = defaultProps;

export default RestorePassword;
