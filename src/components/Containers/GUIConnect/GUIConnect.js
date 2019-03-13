/**
 * Interface Component.
 * The component to connect an element to interface commands such as FlashMessage, Toast and Loader
 * Connect as RenderProps
 * @module Interface
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage, showLoader, hideLoader, showToast } from '../../../actions/app';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Render function */
  render: PropTypes.func.isRequired,
  /** Call add flash message handler */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show loader handler */
  callShowLoader: PropTypes.func.isRequired,
  /** Hide loader handler */
  callHideLoader: PropTypes.func.isRequired,
  /** Show toast handler */
  callShowToast: PropTypes.func.isRequired,
};

const CUIConnect = ({ render, ...otherProps }) => render(otherProps);

CUIConnect.propTypes = propTypes;

const mapDispatchToProps = dispatch => (
  {
    callAddFlashMessage: (body, title, type) => dispatch(addFlashMessage(body, title, type)),
    callShowLoader: () => dispatch(showLoader()),
    callHideLoader: () => dispatch(hideLoader()),
    callShowToast: message => dispatch(showToast(message)),
  }
);

export default connect(null, mapDispatchToProps)(CUIConnect);
