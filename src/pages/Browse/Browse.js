import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { URL_FETCH_PRODUCTS } from '../../config/api';
import { get } from '../../services/ajax';
import ProductsList from '../../components/ProductsList';
import { replaceInRoute } from '../../utils/helpers';
import { localizePath } from '../../localization/index';
import InfinityScroll from '../../components/InfinityScroll';

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
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Current locale */
  locale: PropTypes.string.isRequired,
  /** Array of departments. */
  departments: PropTypes.arrayOf(PropTypes.shape({
    /** Icon of the department. */
    icon: PropTypes.string,
    /** Department name. */
    name: PropTypes.string,
    /** Name in url (slug). */
    nameInUrl: PropTypes.string,
  })).isRequired,
  /** Object in cart quantities. */
  inCartQuantities: PropTypes.shape({}).isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {};


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
        products: { $set: data.records },
        pagesTotal: { $set: data.pagesTotal },
        perPage: { $set: data.perPage },
        page: { $set: data.page },
        count: { $set: data.count },
      }));
      callShowToast('browse.info.products_has_been_loaded');
    } else {
      callAddFlashMessage(message, 'server response', 'error');
    }
  }

  getDepartmentData(departments, nameInUrl) {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].nameInUrl === nameInUrl) {
        return departments[i];
      } else {
        const result = this.getDepartmentData(departments[i].children, nameInUrl);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }


  render() {
    const { products, pagesTotal, page } = this.state;
    const { locale, departments, match: { params, params: { department: currentDepartment } }, inCartQuantities } = this.props;
    if (products.length === 0 || departments.length === 0) {
      return null;
    }

    const currentDepartmentData = this.getDepartmentData(departments, currentDepartment);

    if (currentDepartmentData.length === 0) {
      console.error('Error loading department data');
      return null;
    }

    return (
      <>
      <h1>{currentDepartmentData.name}</h1>

      <InfinityScroll
        url={URL_FETCH_PRODUCTS}
        offset={10}

        currentPage={page}
        pagesTotal={pagesTotal}
        paginationUrl={localizePath(replaceInRoute('/browse/:department/page/:page', {
          ...params,
          page: ':page'
        }), locale)}
        productUrl={localizePath('/product/:id', locale)}
        inCartQuantities={inCartQuantities}

        render={props => <ProductsList {...props} />}
      />
      </>
    );
  }
}

Browse.propTypes = propTypes;
Browse.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments,
    inCartQuantities: state.cart.quantities
  }
);

export default connect(mapStateToProps, null)(Browse);
