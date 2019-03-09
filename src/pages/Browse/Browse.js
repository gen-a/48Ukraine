import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { URL_FETCH_PRODUCTS } from '../../config/api';
import { get } from '../../services/ajax';
import ProductsList from '../../components/ProductsList';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call add flash message handler */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show loader handler */
  callShowLoader: PropTypes.func.isRequired,
  /** Hide loader handler */
  callHideLoader: PropTypes.func.isRequired,
  /** Show toast handler */
  callShowToast: PropTypes.func.isRequired,
  /** Match parameters */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.number
    })
  }),
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  /** Match parameters */
  match: {
    params: {
      department: '',
      page: 1
    }
  },
};


class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const { callShowLoader, match: { params: { department, page } } } = this.props;
    get(URL_FETCH_PRODUCTS, { department, page }, this.onLoadProducts.bind(this));
    callShowLoader();
  }

  onLoadProducts({ error, message, data }) {
    const { callAddFlashMessage, callHideLoader, callShowToast } = this.props;
    callHideLoader();
    if (error === 0) {
      this.setState(prevState => update(prevState, {
        products: { $set: data.records }
      }));
      callShowToast('browse.info.products_has_been_loaded');
    } else {
      callAddFlashMessage(message, 'server response', 'error');
    }
  }


  render() {
    const {products} = this.state;
    if( products.length === 0 ){
      return (<div>browse.info.products_are_loading</div>);
    }
    const { departments, currentDepartment} = this.props;
    const currentDepartmentData = departments.filter((d)=> d.nameInUrl === currentDepartment);

    return (
      <>
      <h1>{currentDepartmentData[0].name}</h1>
        <ProductsList products={products} />
      </>
    );
  }
}

Browse.propTypes = propTypes;
Browse.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.rootDepartments,
    currentDepartment: state.app.routeMatch.params.department || '',
  }
);

export default connect(mapStateToProps, null)(Browse);