import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { URL_FETCH_PRODUCTS } from '../../config/api';
import ProductsList from '../../components/ProductsList';
import { buildUrl } from '../../utils/helpers';
import { localizePath } from '../../localization/index';
import InfinityScroll from '../../components/InfinityScroll';
import PageTitle from '../../components/PageTitle';

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
  /** Location object of Route. */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  /** Current department data. */
  currentDepartment: PropTypes.shape({
    /** Icon of the department. */
    icon: PropTypes.string,
    /** Department name. */
    name: PropTypes.string,
    /** Name in url (slug). */
    nameInUrl: PropTypes.string,
  }).isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {};


class Browse extends Component {

  render() {
    const { location: { search, key }, locale, match: { params }, inCartQuantities, currentDepartment } = this.props;
    const values = queryString.parse(search);
    const currentPage = params.page ? parseInt(params.page, 10) : 1;

    return (
      <InfinityScroll

        key={`${key}`}
        url={URL_FETCH_PRODUCTS}
        params={{ ...params, ...values }}
        offset={200}
        currentPage={currentPage}
        render={(props) => {
          const pageTitle = {};
          const paths = {};

          if (values.query && values.query.length > 0) {
            pageTitle.title = currentDepartment && currentDepartment.name
              ? `Результати пошуку в розділі ${currentDepartment.name}`
              : "Результати пошуку";
            pageTitle.description = `за запитом "${values.query}" знайдено продуктів: ${props.count}`;
            paths.pagination = `/browse/page/:page${search}`;
            paths.product = `/product/:id${search}`;
          } else {
            pageTitle.title = currentDepartment && currentDepartment.name
              ? currentDepartment.name
              : "Всі продукти";
            pageTitle.description = props.count > 0
              ? `знайдено продуктів: ${props.count}`
              : '';
            paths.pagination = '/browse/:department/page/:page';
            paths.product = '/product/:id';
          }

          return (
            <>
            <PageTitle
              title={pageTitle.title}
              description={pageTitle.description}
            />
            <ProductsList
              {...props}
              pagesTotal={props.pagesTotal}
              paginationUrl={localizePath(buildUrl(paths.pagination, {
                ...params,
                page: ':page'
              }), locale)}
              productUrl={localizePath(paths.product, locale)}
              inCartQuantities={inCartQuantities}
            />
            </>
          )
        }}
      />
    );
  }
}

Browse.propTypes = propTypes;
Browse.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    departments: state.app.departments,
    currentDepartment: state.app.currentDepartment,
    inCartQuantities: state.cart.quantities
  }
);

export default connect(mapStateToProps, null)(Browse);
