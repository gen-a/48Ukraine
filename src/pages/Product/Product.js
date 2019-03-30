import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { URL_FETCH_PRODUCT } from '../../config/api';
import { get } from '../../services/ajax';
import ProductLeaflet from '../../components/ProductLeaflet';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call add flash message handler. */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show loader handler. */
  callShowLoader: PropTypes.func.isRequired,
  /** Hide loader handler. */
  callHideLoader: PropTypes.func.isRequired,
  /** Match parameters. */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Current locale. */
  locale: PropTypes.string.isRequired,
  /** Media query prefix. */
  mediaPrefix: PropTypes.string.isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {

};


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    const { callShowLoader, match: { params: { id } } } = this.props;
    get(URL_FETCH_PRODUCT, { id }, this.onLoadProduct.bind(this));
    callShowLoader();
  }

  onLoadProduct({ error, message, data }) {
    const { callAddFlashMessage, callHideLoader } = this.props;
    callHideLoader();
    if (error === 0) {
      this.setState(prevState => update(prevState, {
        product: { $set: data }
      }));
    } else {
      callAddFlashMessage(message, 'server response', 'error');
    }
  }

  render() {
    const { product } = this.state;
    const { mediaPrefix } = this.props;

    if (Object.keys(product).length === 0) {
      return null;
    }

    return (
      <ProductLeaflet
        {...{ ...product, mediaPrefix }}
      />
    );
  }
}

Product.propTypes = propTypes;
Product.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments,
    mediaPrefix: state.app.window.mediaPrefix,
  }
);

export default connect(mapStateToProps, null)(Product);
