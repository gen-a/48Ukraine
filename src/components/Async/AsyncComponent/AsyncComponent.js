/**
 * Asynchronious Component Loader.
 * Load component asynchroniously
 * @module Image
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Placeholder while loading. */
  placeholder: PropTypes.node,
  /** Function that return import(../path/to/the/component) promise. */
  component: PropTypes.func.isRequired,
  /** Error handler. */
  onError: PropTypes.func,
  /** Load full size image handler. */
  onLoad: PropTypes.func,

};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  placeholder: <div>Loading...</div>,
  onError: console.log,
  onLoad: ()=>{},
};


class AsyncComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imported: null
    }
  }

  componentDidMount() {
    const { component, onError, onLoad } = this.props;
    component()
      .then((module) => {
        this.setState({ imported: module.default });
        onLoad();
      })
      .catch((err) => onError(err));
  }

  render() {
    const {  onError, onLoad, component, placeholder, ...props  } = this.props;
    const {  imported: C  } = this.state;
    return C === null ? placeholder : <C {...props} />;

  }
}

AsyncComponent.propTypes = propTypes;
AsyncComponent.defaultProps = defaultProps;

export default AsyncComponent;