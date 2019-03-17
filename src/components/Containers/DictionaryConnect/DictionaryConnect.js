/**
 * Dictionary Component.
 * Placeholder fot the description
 * @module Dictionary
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Render function */
  dictionary: PropTypes.shape({}).isRequired,
};

const DictionaryConnect = ({ render, ...otherProps }) => render(otherProps);

DictionaryConnect.propTypes = propTypes;

const mapStateToProps = state => (
  {
    dictionary: state.dictionary,
  }
);

export default connect(mapStateToProps, null)(DictionaryConnect);
