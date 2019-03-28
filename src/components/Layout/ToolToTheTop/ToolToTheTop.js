/**
 * ToolToTheTop Component.
 * Placeholder fot the description
 * @module ToolToTheTop
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowUpBoldCircle from '../../Svg/ArrowUpBoldCircle';
import ToolIcon from '../../UI/ToolIcon';


import './ToolToTheTop.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Number of top scroll for showing element. */
  offset: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  offset: 100
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class ToolToTheTop extends Component {
  static scrollTop() {
    return (
      window.pageYOffset
      || document.documentElement.scrollTop) - (document.documentElement.clientTop
      || 0
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { offset } = this.props;
    this.setState({
      isVisible: ToolToTheTop.scrollTop() > offset
    });
  }

  render() {
    const { size } = this.props;
    const { isVisible } = this.state;
    const className = isVisible ? 'ToolToTheTop ToolToTheTop_isVisible' : 'ToolToTheTop';

    return (
      <div className={className} style={{zIndex:100}}>

          <ToolIcon
            size={size}
            svg={<ArrowUpBoldCircle/>}
            onClick={() => {
              window.scrollTo(0, 0)
            }}
          />

      </div>
    );
  }
}

ToolToTheTop.propTypes = propTypes;
ToolToTheTop.defaultProps = defaultProps;

export default ToolToTheTop;
