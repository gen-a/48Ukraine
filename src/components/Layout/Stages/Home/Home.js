/**
 * Home Component.
 * Placeholder fot the description
 * @module Home
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideShow from '../../../UI/SlideShow';

import './Home.scss';
import AspectRatioBox from '../../../UI/AspectRatioBox/AspectRatioBox';
import { addFlashMessage, removeFlashMessage } from '../../../../actions/app';


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

  onAddMessageButtonClick(){
    const { callAddFlashMessage  } = this.props;
    callAddFlashMessage(
      'Test message',
      'Test message title',
      'error'
    );
    callAddFlashMessage(
'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, itaque!',
      'Test message title',
      'error'
    );
    callAddFlashMessage(
      'Test message',
      'Test message title',
      'error'
    );
  }


  render() {
    console.group('Props received by Home')
    console.log(this.props);
    console.groupEnd();




    const { top, window: { width, height }, callAddFlashMessage, callHideFlashMessage, callShowFlashMessage, callRemoveFlashMessage } = this.props;
const imageStyle = {display:'block', width:'100%'};

    return (
      <div className="Home">
<div style={{margin:'40px 0'}}>
        <AspectRatioBox width={1364} height={300}>
            <SlideShow autoPlay={true}>
              <div>
                <img src="/images/home-slide-show/file_2.jpg" alt="" style={imageStyle}/>
              </div>
              <div>
                <img src="/images/home-slide-show/file_3.jpg" alt="" style={imageStyle}/>
              </div>
              <div>
                <img src="/images/home-slide-show/file_4.jpg" alt="" style={imageStyle}/>
              </div>
            </SlideShow>
        </AspectRatioBox>

</div>


        <button onClick={()=>this.onAddMessageButtonClick()}>add message</button>

      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    openDrawer: state.app.openDrawer,
    window: state.app.window,
  }
);

const mapDispatchToProps = dispatch => (
  {
    callAddFlashMessage: (body, title, type) => dispatch(addFlashMessage(body, title, type)),
    callRemoveFlashMessage: (id) => dispatch(removeFlashMessage(id)),
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(Home);

