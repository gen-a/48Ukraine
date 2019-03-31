import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL_FETCH_USER_ORDERS } from '../../../config/api';
import OrdersList from '../../../components/OrdersList';
import { localizePath } from '../../../localization/index';
import PageTitle from '../../../components/PageTitle';
import InfinityScroll from '../../../components/InfinityScroll';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Match parameters */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Location route parameters */
  location: PropTypes.shape({
    key: PropTypes.string,
  }).isRequired,
  /** Current locale */
  locale: PropTypes.string.isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {};


class Orders extends Component {

  render() {
    const { location: { key }, match: { params }, locale } = this.props;
    const currentPage = params.page ? parseInt(params.page, 10) : 1;

    return (
      <InfinityScroll
        key={`${key}`}
        url={URL_FETCH_USER_ORDERS}
        params={{ ...params }}
        offset={200}
        currentPage={currentPage}
        render={(props) => {
          return (
            <>
            <PageTitle
              title="Історія замовлень"
            />
            <OrdersList
              {...props}
              pagesTotal={props.pagesTotal}
              paginationUrl={localizePath('/user/orders/page/:page', locale)}
            />
            </>
          );
        }}/>
    );
  }
}

Orders.propTypes = propTypes;
Orders.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
  }
);

export default connect(mapStateToProps, null)(Orders);