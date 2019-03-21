/**
 * Home Component.
 * Placeholder fot the description
 * @module Home
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from '../../components/Widgets/Search';

import './Home.scss';
import { addFlashMessage, removeFlashMessage } from '../../actions/app';
import Pagination from '../../components/UI/Pagination';


import ProductsPromo from '../../components/ProductsPromo';
import ResponsiveSlideShow from '../../components/UI/ResponsiveSlideShow';
import ResponsiveSlideShowGroup from '../../components/UI/ResponsiveSlideShow/Group';
import { URL_SEARCH_HINT, URL_SEARCH_SUBMIT } from '../../config/api';

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


    const { window: { width, height } } = this.props;
    const imageStyle = { display: 'block', width: '100%' };

    const slideShowVariant = width / height > 1 ? 'h' : 'v';
    const slideShowBoxStyle = slideShowVariant == 'h'
      ? { margin: '40px auto 60px auto' }
      : { maxWidth: '500px', margin: '40px auto 60px auto' };


    return (
      <div className="Home">
        <Search
          urlHint={URL_SEARCH_HINT}
          urlSubmit={URL_SEARCH_SUBMIT}
          minlength={3}
          onError={console.log}
          onSuccess={console.log}
        />



  {/*      {
          [...new Array(6)].map((n, x) => (
            [...new Array(6-x)].map((g, y) => (
            <Pagination
              limit={5}
              total={6}
              current={x + 1}
              url={'/:page'}
              infinityLoads={y + 1}
            />
            ))

          ))
        }*/}
        <div style={slideShowBoxStyle}>
          <ResponsiveSlideShow variant={slideShowVariant}>
            <ResponsiveSlideShowGroup name="v" width={500} height={500}>
              <div key="111">
                <img src="/images/home-slide-show/banner-facebook-flowers-624x624.jpg" alt="" style={imageStyle}/>
              </div>
              <div key="222">
                <img src="/images/home-slide-show/banner-facebook-free-st.niklas-624x624.jpg" alt=""
                     style={imageStyle}/>
              </div>
              <div key="333">
                <img src="/images/home-slide-show/banner-facebook-free-caviar-624x624.jpg" alt="" style={imageStyle}/>
              </div>
            </ResponsiveSlideShowGroup>
            <ResponsiveSlideShowGroup name="h" width={1364} height={300}>
              <div key="111">
                <img src="/images/home-slide-show/file_2.jpg" alt="" style={imageStyle}/>
              </div>
              <div key="222">
                <img src="/images/home-slide-show/file_3.jpg" alt="" style={imageStyle}/>
              </div>
              <div key="333">
                <img src="/images/home-slide-show/file_4.jpg" alt="" style={imageStyle}/>
              </div>
            </ResponsiveSlideShowGroup>
          </ResponsiveSlideShow>
        </div>
        <ProductsPromo/>
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

