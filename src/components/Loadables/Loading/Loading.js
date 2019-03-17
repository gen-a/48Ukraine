/**
 * Asynchronous Loading Component. Indicate loading in progress
 * @module User
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage, showLoader, hideLoader } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** An Error object passed to LoadingComponent when the loader has failed. */
  error: PropTypes.bool,
  /** Children element to be rendered inside the component. */
  retry: PropTypes.func,
  /** A boolean prop passed to LoadingComponent after a set timeout. */
  timedOut: PropTypes.bool,
  /** A boolean prop passed to LoadingComponent after a set delay. */
  pastDelay: PropTypes.bool,
  /** Function to show system message */
  callAddFlashMessage: PropTypes.func,
  /** Function to show loader */
  callShowLoader: PropTypes.func,
  /** Function to hide loader */
  callHideLoader: PropTypes.func,
  /** Message on error loading */
  messageErrorLoading: PropTypes.string.isRequired,
  /** Message on error timeout */
  messageErrorTimeout: PropTypes.string.isRequired,
  /** Error title for System message */
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
  callAddFlashMessage: (body, title, type) => console.log(body, title, type),
  callShowLoader: () => console.log('callShowLoader'),
  callHideLoader: () => console.log('callHideLoader'),
};


const Loading = ({
                   titleError, messageErrorLoading, messageErrorTimeout,
                   callShowLoader, callHideLoader, callAddFlashMessage,
                   retry, error, pastDelay, timedOut
                 }) => {


    if (error) {
      callHideLoader();
      callAddFlashMessage(messageErrorLoading, titleError, 'error');
    } else if (timedOut) {
      callHideLoader();
      callAddFlashMessage(messageErrorTimeout, titleError, 'error');
    } else if (pastDelay) {
      callShowLoader();
    } else {
      callHideLoader();
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
    titleError: state.dictionary.flashMessage.title.error,
  }
);

const mapDispatchToProps = dispatch => (
  {
    callAddFlashMessage: (body, title, type) => dispatch(addFlashMessage(body, title, type)),
    callShowLoader: () => dispatch(showLoader()),
    callHideLoader: () => dispatch(hideLoader())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
