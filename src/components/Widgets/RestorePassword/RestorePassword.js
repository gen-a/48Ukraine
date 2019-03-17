/**
 * RestorePassword Component.
 * Placeholder fot the description
 * @module RestorePassword
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './RestorePassword.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class RestorePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="RestorePassword">

        <button
          type="button"
          className="RestorePassword__restoreButton"
        >
          Restore forgotten password
        </button>
      </div>
    );
  }
}

RestorePassword.propTypes = propTypes;
RestorePassword.defaultProps = defaultProps;

export default RestorePassword;
