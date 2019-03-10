/**
 * Pagination Component.
 * Placeholder fot the description
 * @module Pagination
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '../../Svg/ChevronLeft';
import Ripple from '../../UI/Ripple';

import './Pagination.scss';

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
const Pagination = ({limit, total, current, segment, labelPrev, labelNext, urlTemplate}) =>{

  const length = Math.min(total, limit);
  const [offset, setOffset] = useState(Math.max(1, current - Math.floor(length / 2)));

  return (
    <div className="Pagination">
      <button className="Pagination__page Pagination__prev" onClick = { () => setOffset(Math.max(1, offset - length))} >
        <ChevronLeft />
      </button>

      {
        [...new Array(length)].map((n, index) =>{
          const className = index + offset === current ? 'Pagination__page Pagination__page_current':'Pagination__page';
          return (
            <Ripple>
              <button className={className}>{index + offset}</button>
            </Ripple>
        )})
      }
      <button className="Pagination__page Pagination__next" onClick = { () => setOffset(Math.min(total - length + 1, offset + length))} >
        <ChevronLeft />
      </button>
    </div>
  );
};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
