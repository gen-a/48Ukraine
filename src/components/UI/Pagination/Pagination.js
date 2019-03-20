/**
 * Pagination Component.
 * Placeholder fot the description
 * @module Pagination
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import ChevronLeft from '../../Svg/ChevronLeft';
import { Route } from 'react-router-dom';

import './Pagination.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Limit of the pages to show. */
  limit: PropTypes.number.isRequired,
  /** Total number of pages. */
  total: PropTypes.number.isRequired,
  /** Current pages. */
  current: PropTypes.number.isRequired,
  /** InfinityScrollOffset. */
  infinityLoads: PropTypes.number,
  /** Route history object. */
  history: PropTypes.shape({}).isRequired,
  /** URL template as /something/:page. */
  url: PropTypes.string.isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  infinityLoads: 0,
};


/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Pagination = ({ limit, total, current, history, url, infinityLoads }) => {

  if (infinityLoads === 0) {
    return null;
  }

  const length = Math.max(1, Math.min(total - infinityLoads + 1, limit));
  const maxOffset = total - infinityLoads - length + 2;
  const getOffset = c => Math.max(1, Math.min(c - Math.floor(length / 2), maxOffset));

  const [offset, setOffset] = useState(getOffset(current));

  const redirectTo = (page) => {
    history.push(url.replace(/:page/, page));
  };

  const skip = Math.min(maxOffset, offset);
  const pages = [...new Array(length)].map((n, index) => {
    const page = skip + index;
    const loadsOffset = Math.max(infinityLoads - 1, 0);
    if (page > current) {
      return [page + loadsOffset];
    } else {
      if (page === current) {
        return [page, page + loadsOffset];
      } else {
        return [page];
      }
    }
  });

  return (

    <div className="Pagination">
      <button
        disabled={skip === 1}
        className="Pagination__button"
        onClick={() => setOffset(Math.max(1, skip - length))}
      >
        <ChevronLeft width="24px" height="24px"/>
      </button>
      {
        pages.map((n, index) => {

          const className = n[0] === current
            ? 'Pagination__button Pagination__page Pagination__page_current'
            : 'Pagination__button Pagination__page';

          const label = n[0] === current && n[0] !== n[1]
            ? `${n[0]}-${n[1]}`
            : n[0];

          return (

            <button
              key={uid(index + offset)}
              className={className}
              onClick={() => redirectTo(n[0])}
            >
              {label}
            </button>

          );
        })
      }
      <button
        disabled={skip === maxOffset}
        className="Pagination__button"
        onClick={() => setOffset(Math.min(maxOffset, skip + length))}
      >
        <ChevronLeft width="24px" height="24px" style={{ transform: 'rotate(180deg)' }}/>
      </button>
    </div>

  );
};
Pagination.defaultProps = defaultProps;
Pagination.propTypes = propTypes;

export default props => <Route render={routeProps => <Pagination {...routeProps} {...props} />}/>;
