/**
 * Asynchronous Loading Component. Indicate loading in progress
 * @module User
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showFlashMessage, showLoader, hideLoader } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* An Error object passed to LoadingComponent when the loader has failed. */
  error: PropTypes.bool,
  /* Children element to be rendered inside the component. */
  retry: PropTypes.func,
  /* A boolean prop passed to LoadingComponent after a set timeout. */
  timedOut: PropTypes.bool,
  /* A boolean prop passed to LoadingComponent after a set delay. */
  pastDelay: PropTypes.bool,
  /* Function to show system message */
  onShowMessage: PropTypes.func,
  /* Function to show loader */
  onShowLoader: PropTypes.func,
  /* Function to hide loader */
  onHideLoader: PropTypes.func,
  /* Message on error loading */
  messageErrorLoading: PropTypes.string.isRequired,
  /* Message on error timeout */
  messageErrorTimeout: PropTypes.string.isRequired,
  /* Error title for System message */
  titleError: PropTypes.string.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  error: null,
  timedOut: false,
  pastDelay: false,
  onShowMessage: (body, title, type) => console.log(body, title, type),
  onShowLoader: () => console.log('onShowLoader'),
  onHideLoader: () => console.log('onHideLoader'),
};


const Loading = ({
                   titleError, messageErrorLoading, messageErrorTimeout,
                   onShowLoader, onHideLoader, onShowMessage,
                   retry, error, pastDelay, timedOut
                 }) => {
  if (error) {
    onHideLoader();
    onShowMessage(messageErrorLoading, titleError, 'error');
  } else if (timedOut) {
    onHideLoader();
    onShowMessage(messageErrorTimeout, titleError, 'error');
  } else if (pastDelay) {
    onShowLoader();
  } else {
    onHideLoader();
  }
  return null;
  /*
  if (error) {
    return (
      <div>
        Error!
        <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (timedOut) {
    return (
      <div>
        Taking a long time...
        <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (pastDelay) {
    return (<div>Loading...</div>);
  } else {
    return null;
  }*/
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    messageErrorLoading: state.dictionary.loading.message.error.loading,
    messageErrorTimeout: state.dictionary.loading.message.error.timeout,
    titleError: state.dictionary.systemMessage.title.error,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onShowMessage: (body, title, type) => dispatch(showFlashMessage(body, title, type)),
    onShowLoader: () => dispatch(showLoader()),
    onHideLoader: () => dispatch(hideLoader())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
