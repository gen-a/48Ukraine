import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from '../../components/SplashScreen';
import { URL_REQUEST_ACCESS_WITH_VISA } from '../../config/api';
import { get } from '../../services/ajax';
import { translate, localizePath } from '../../localization';
import { setAuthenticatedUser } from '../../actions/user';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call set authenticated user data handler. */
  callSetAuthenticatedUser: PropTypes.func.isRequired,
  /** Call add flash message handler */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show toast handler */
  callShowToast: PropTypes.func.isRequired,
  /** Match parameters */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Current locale */
  locale: PropTypes.string.isRequired,
  /** Render function */
  dictionary: PropTypes.shape({}).isRequired,
  /** History object */
  history: PropTypes.shape({}).isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {};

class EnterAccount extends Component {

  componentDidMount() {
    const { match: { params: { visa } } } = this.props;
    get(
      URL_REQUEST_ACCESS_WITH_VISA.replace(/:visa/, visa),
      {},
      this.handleServerResponse.bind(this)
    );
  }

  handleServerResponse(response) {
    const { error, data, message } = response;
    const { history, callShowToast, dictionary, callAddFlashMessage, locale, callSetAuthenticatedUser } = this.props;
    if (error === 0) {
      callSetAuthenticatedUser(data);
      callShowToast(
        translate(dictionary, message, data),
      );
      history.push(localizePath('/user/reset-password', locale));
    } else {
      callAddFlashMessage(
        translate(dictionary, message, data),
        translate(dictionary, 'flashMessage.title.serverMessage', data),
        'error'
      );
      history.push(localizePath('/', locale));
    }

  }

  render() {
    return <SplashScreen/>;
  }
}

EnterAccount.propTypes = propTypes;
EnterAccount.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => (
  {
    callSetAuthenticatedUser: data => dispatch(setAuthenticatedUser(data)),
  }
);
export default connect(null, mapDispatchToProps)(EnterAccount);