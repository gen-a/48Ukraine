/**
 * The component to detect outside click
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

const defaultProps = {
  children: '',
  disabled: false
};

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  /**
   * Control propagation
   * @param e {Event} - original click event
   */
  stopPropagation(e) {
    const { disabled } = this.props;
    if (!disabled) {
      e.stopPropagation();
    }
  }

  /**
   * Handle on click
   * @param e {Event} - original click event
   */
  onClick(e) {
    const { onClick, disabled } = this.props;
    if (!disabled) {
      onClick(e);
    }
  }

  /**
   * Add event listeners on mounting element
   */
  componentDidMount() {
    window.addEventListener('click', this.onClick.bind(this));
    this.ref.current.addEventListener('click', this.stopPropagation.bind(this));
  }

  /**
   * Remove event listeners on unmounting element
   */
  componentWillUnmount() {
    this.ref.current.removeEventListener('click', this.stopPropagation.bind(this));
    window.removeEventListener('click', this.onClick.bind(this));
  }

  render() {
    const { children } = this.props;
    return (
      <span ref={this.ref}>{children}</span>
    );
  }
}

ClickOutside.propTypes = propTypes;
ClickOutside.defaultProps = defaultProps;

export default ClickOutside;
