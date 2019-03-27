/**
 * Search Component.
 * Controls handle results of SearchForm Component
 * @module Search
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import SearchForm from './SearchForm';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Route location object. */
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  /** Route history object. */
  history: PropTypes.shape({}).isRequired,
  /** Filters. */
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
      selected: PropTypes.bool,
    })
  ),
  /** Search pathname route. */
  routePath: PropTypes.string,
  /** Input update route onChange delay ms. */
  delay: PropTypes.number,
  /** Input value min length to be searched. */
  minLength: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  filters: [],
  routePath: '/search',
  delay: 1000,
  minLength: 3
};

/**
 * Search component takes route data as arguments and render search input with given filters
 */
const Search = ({ location: { pathname, search }, history, filters, routePath, delay, minLength }) => {

  //timeout of the change route delay
  const [onChangeTimeout, setOnChangeTimeout] = useState(0);
  /**
   * Set new route path according with input query and checkboxes selects
   */
  const setRoute = (v) => {
    if (v.query && v.query.length >= minLength) {
      const result = Object.keys(v).map(f => `${f}=${encodeURIComponent(v[f])}`);
      history[pathname === routePath ? 'replace' : 'push'](`${routePath}?${result.join('&')}`);
    }
  };
  /**
   * Set timeout for update route after input or checkboxes changes
   */
  const onChangeInputs = (v) => {
    clearTimeout(onChangeTimeout);
    setOnChangeTimeout(setTimeout(() => setRoute(v), delay));
  };


  const values = queryString.parse(search);
  const filtersData = search !== ''
    ? [...filters.map(filter => ({ ...filter, selected: !!values[filter.name] }))]
    : filters;

  return (
    <SearchForm
      onChange={v => onChangeInputs(v)}
      pristine={search === ''}
      filters={filtersData}
      values={values}
    />
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default props => <Route render={routeProps => <Search {...routeProps} {...props} />}/>;
