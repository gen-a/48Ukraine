/**
 * Search Component.
 * Placeholder fot the description
 * @module Search
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.scss';

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
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <button className="Search">
        <select type="button" >
          <option>department</option>
          <option>department</option>
        </select>

        <input value={} onChange={} />

        <button type="button" >


        </button>
      </div>
    );
  }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
