import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  children: '',
};

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.isBlocked = false;
  }

  componentDidMount() {
    const {onClick} = this.props;

    this.ref.current.addEventListener( 'click', this.blockClick.bind(this));
    window.addEventListener('click', onClick);
  }

  componentWillUnmount() {
    const {onClick} = this.props;
    this.ref.current.removeEventListener( 'click', this.blockClick.bind(this));
    window.removeEventListener('click', onClick);
  }

  onClick(){
    const {onClick} = this.props;
    if(!this.isBlocked){
      onClick();
    }
    console.log('unИlockClick');
    this.isBlocked = false;
  }
  blockClick(){
    console.log('blockClick');
    this.isBlocked = true;
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
