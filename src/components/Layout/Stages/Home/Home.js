/**
 * Home Component.
 * Placeholder fot the description
 * @module Home
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Home.scss';
import AspectRatioBox from "../../../UI/AspectRatioBox/AspectRatioBox";
import Ripple from "../../../UI/Ripple/Ripple";

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
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    console.group('Props received by Home')
    console.log(this.props);
    console.groupEnd();

    const { top, window: { width, height } } = this.props;
    return (
      <div className="Home">

        <div>
        <Ripple color="white">
          <button
            style={{
              background: 'red',
              position: 'relative',
              padding: '10px',
              border:0 ,
              overflow: 'hidden',
              outline:'none'
            }}
            onClick={(e) => console.log}
          >
            button text
          </button>
        </Ripple>
      </div>
        {/* <AspectRatioBox width={1364} height={300} className="Home__slideShow">

            <img src="/images/home-slide-show/file_3.jpg" alt="" className="Home__slideShowImage"/>

        </AspectRatioBox>*/}
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
