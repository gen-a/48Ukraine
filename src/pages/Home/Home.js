/**
 * Home Component.
 * Placeholder fot the description
 * @module Home
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import './Home.scss';
import { addFlashMessage, removeFlashMessage } from '../../actions/app';
import HomeSlideShow from '../../components/HomeSlideShow';
import WindowSize from '../../components/Containers/WindowSize';
import ProductsPromo from '../../components/ProductsPromo';


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

    const { window: { width, height } } = this.props;
    const imageStyle = { display: 'block', width: '100%' };

    const slideShowVariant = width / height > 1 ? 'h' : 'v';
    const slideShowBoxStyle = slideShowVariant == 'h'
      ? { margin: '40px auto 60px auto' }
      : { maxWidth: '500px', margin: '40px auto 60px auto' };


    return (
      <div className="Home">

        <WindowSize render={props => <HomeSlideShow {...props} />} />

        <ProductsPromo />
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

