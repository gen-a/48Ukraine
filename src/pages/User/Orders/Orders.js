import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { URL_FETCH_USER_ORDERS } from '../../../config/api';
import { get } from '../../../services/ajax';
import OrdersList from '../../../components/OrdersList';
import { localizePath } from '../../../localization/index';
import PageTitle from '../../../components/PageTitle';
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


class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    const { callShowLoader, match: { params: { page } } } = this.props;
    get(URL_FETCH_USER_ORDERS, { page }, this.onLoadOrders.bind(this));
    callShowLoader();
  }

  onLoadOrders({ error, message, data }) {
    const { callAddFlashMessage, callHideLoader, callShowToast } = this.props;
    callHideLoader();
    if (error === 0) {
      this.setState(prevState => update(prevState, {
        orders: { $set: data.records },
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

  render() {
    const { orders, pagesTotal, page } = this.state;
    const { locale } = this.props;
    if (orders.length === 0 && !page ) {
      return null;
    }

    return (
      <>
      <PageTitle
        title="Orders History"
      />
      <OrdersList
        orders={orders}
        currentPage={page}
        pagesTotal={pagesTotal}
        paginationUrl={localizePath('/user/orders/page/:page', locale)}
      />
      </>
    );
  }
}

Orders.propTypes = propTypes;
Orders.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments,
    inCartQuantities: state.cart.quantities
  }
);

export default connect(mapStateToProps, null)(Orders);
