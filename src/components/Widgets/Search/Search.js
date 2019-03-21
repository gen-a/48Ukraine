/**
 * Search Component.
 * Placeholder fot the description
 * @module Search
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { post } from '../../../services/ajax';
import Magnify from '../../Svg/Magnify';
import {
  CircularProgress
} from '../../UI/MaterialUI' ;

import './Search.scss';

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
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filters: {},
      hints: [],
      isVisibleHints: false,
      isFocused: false,
      isSubmitting: false
    };
    this.hintsUl = createRef();
    this.hints = {};
  }

  displayHints() {
    const { minlength } = this.props;
    const { value, filters } = this.state;
    const filtersKey = JSON.stringify(filters);
    const key = value.substr(0, minlength);
    if (this.hints[filtersKey]) {
      if (this.hints[filtersKey][key].length > 0) {
        const re = new RegExp(value, 'gi');
        this.setState(prevState => ({
          ...prevState,
          hints: this.hints[filtersKey][key].filter(m => m.match(re)),
          isVisibleHints: true
        }), () => {
          const re = new RegExp(`(${value})`, 'gi');
          this.hintsUl.current
            .querySelectorAll('li')
            .forEach(li => {
              li.innerHTML = li.innerHTML.replace(re, '<b>$1</b>');
            });
        });
      }
    }
  }

  onChange(value) {
    const { minlength, urlHint } = this.props;
    const { filters } = this.state;
    this.setState(prevState => ({
      ...prevState,
      value,
      hints: [],
      isVisibleHints: false
    }), () => {

      if (urlHint.length && value.length >= minlength) {
        const filtersKey = JSON.stringify(filters);
        const { hints } = this;
        if (!hints[filtersKey]) {
          hints[filtersKey] = {};
        }
        const key = value.substr(0, minlength);
        if (!hints[filtersKey][key]) {

          post(urlHint, { key, filters }, ({ error, message, data }) => {
            if (error === 0) {
              hints[filtersKey][key] = data.records.filter((hint, index, self) => (self.indexOf(hint) === index));
              this.displayHints();
            } else {
              throw new Error(message);
            }
          });
        } else {
          this.displayHints();
        }
      }
    });
  }

  onBlur() {
    this.setState((prevState) => ({
      ...prevState,
      isFocused: false
    }));
  }

  onFocus() {
    this.setState((prevState) => ({
      ...prevState,
      isFocused: true
    }));
  }

  onSubmit() {
    this.setState((prevState) => ({
      ...prevState,
      hints: [],
      isFocused: true,
      isSubmitting: true
    }));
    const { value } = this.state;
    const { urlSubmit, onError, onSuccess } = this.props;

    post(urlSubmit, { query: value }, ({ error, message, data }) => {
      if (error === 0) {
        this.setState((prevState) => ({
          ...prevState,
          isSubmitting: false,
          value: '',
          hints: [],
        }));
        onSuccess(data);
      } else {
        this.setState((prevState) => ({
          ...prevState,
          isSubmitting: false,
        }));
        onError( message );
      }
    });
  }

  render() {
    const { value, filters, hints, isVisibleHints, isFocused, isSubmitting } = this.state;

    return (
      <div
        className={isFocused ? 'Search Search_focused' : 'Search'}
        tabIndex="0"
        onFocus={() => {
          this.onFocus();
        }}
        onBlur={() => {
          this.onBlur();
        }}
      >
        <div className="Search__inputBox">
          {/*<button type="button" className="Search__filter">Filter</button>*/}
          <input
            placeholder="Search"
            value={value}
            onChange={e => this.onChange(e.currentTarget.value)}
            className="Search__input"
          />
          {isSubmitting
            ? (
              <div className="Search__progress">
                <CircularProgress/>
              </div>
            )
            : (
              <button
                type="button"
                className="Search__button"
                onClick={() => this.onSubmit()}
              >
                <Magnify/>
              </button>
            )
          }
        </div>
        <div className="Search__helpersBox">
          <div
            className={isVisibleHints
              ? 'Search__hints Search__hints_isVisible'
              : 'Search__hints'}
          >
            {(
              <ul ref={this.hintsUl}>
                {hints.map(hint => (
                  <li
                    key={hint}
                    onClick={(e) => this.onChange(hint)}
                  >
                    {hint}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
