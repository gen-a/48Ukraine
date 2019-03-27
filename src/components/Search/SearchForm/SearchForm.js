/**
 * SearchForm Component.
 * Search for render input query and filters for searching
 * @module SearchForm
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Magnify from '../../Svg/Magnify';

import './SearchForm.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Is pristine . */
  pristine: PropTypes.bool,
  /** Values. */
  values: PropTypes.shape({}),
  /** Filters. */
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
      selected: PropTypes.bool,
    })
  ),
  /** On change form handler. */
  onChange: PropTypes.func,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  pristine: true,
  values: {},
  filters: [],
  onChange: console.log
};


/**
 * SearchForm component takes route data as arguments and render search input with given filters
 */
const SearchForm = ({ pristine, values, filters, onChange }) => {

  // response for on focus css class
  const [isFocused, setFocused] = useState(false);
  // check box selected object
  const [searchValues, setSearchFormValues] = useState(values);
  /**
   * Input change handler. Store value and set update route timeout
   * @param name {string} - Name of the parameter
   * @param value {string} - Value of the parameter
   * @param include {boolean} - To be included in final selection
   */
  const onChangeInput = (name, value, include) => {
    const { [name]: deleted, ...otherFilters } = searchValues;
    const newValue = include ? { ...otherFilters, [name]: value } : { ...otherFilters };
    setSearchFormValues(newValue);
    onChange(newValue);
  };

  // collect rendered checkboxes array
  const renderFilters = filters.map((f) => {
    const id = `${f.name}-${f.value}`;
    return (
      <li key={id} className="SearchForm__filter">
        <div>
          <div className="SearchForm__icon">
            <Magnify/>
          </div>
          <input
            id={id}
            type="checkbox"
            value={f.value}
            name={f.name}
            checked={ pristine ? searchValues[f.name] === f.value : f.selected }
            onChange={(e) => onChangeInput(f.name, f.value, e.currentTarget.checked)}
          />
          <label className="SearchForm__filterLabel" htmlFor={id}>
            {f.label}
          </label>
        </div>
      </li>
    );
  });

  return (
    <div
      className={isFocused ? 'SearchForm SearchForm_focused' : 'SearchForm'}
      tabIndex="0"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="SearchForm__inputBox">
        <input
          placeholder="Пошук..."
          value={searchValues.query || ''}
          onChange={({ currentTarget: {value} }) => onChangeInput('query', value, value !== '')}
          className="SearchForm__input"
        />
      </div>
      <div className="SearchForm__filtersBox">
        <ul className="SearchForm__filters">
          {renderFilters}
        </ul>
      </div>
    </div>
  );
};

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
