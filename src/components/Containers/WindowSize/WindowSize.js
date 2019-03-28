/**
 * WindowSize Component.
 * Placeholder fot the description
 * @module WindowSize
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Render function */
  mediaPrefix: PropTypes.string.isRequired,
  /** Call add flash message handler */
  windowWidth: PropTypes.number.isRequired,
  /** Show loader handler */
  windowHeight: PropTypes.number.isRequired,
  /** Hide loader handler */
  devicePixelRatio: PropTypes.number.isRequired,
};

const WindowSize = ({ render, ...otherProps }) => render(otherProps);

WindowSize.propTypes = propTypes;

const mapStateToProps = state => (
  {
    mediaPrefix: state.app.window.mediaPrefix,
    windowWidth: state.app.window.width,
    windowHeight: state.app.window.height,
    devicePixelRatio: state.app.window.devicePixelRatio,
  }
);

export default connect(mapStateToProps, null)(WindowSize);
